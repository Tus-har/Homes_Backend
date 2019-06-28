import {Injectable} from "@nestjs/common";
import {User} from "../../database/entity/user.entity";
import {Role, Sex} from "../../enums/UserEnums";
import * as bcrypt from "bcryptjs";
import { saltRounds , Message} from "../../constant";
import RepoService from "../../database/repositories/RepoService";
import ServerResponse from "../../ServerResponse";
import GuardUtil from "../gaurds/guardUtil";
import {UpdateResult} from "typeorm";
import isEmail from "validator/lib/isEmail";
import Can from "../Can";
import {IAuthDetails} from "../../interfaces/IAuthDetails";

@Injectable()
export class UserService {
    async login(email= "", password= ""): Promise<ServerResponse>{
        const user: User = await RepoService.getSingleton().userRepo.findOne({email});
        console.log(user);
        if (!user)
            return ServerResponse.error(Message.USER_NOT_FOUND , 404);

        if (bcrypt.compareSync(password, user.password))
        {
            return ServerResponse.success(Message.ACCESS_GRANTED, { jwttoken: GuardUtil.generateJWTToken(user) ,  ...user.toJson()} );
        }
        return ServerResponse.error(Message.INVALID_CREDENTIALS , 400);
    }

    async register({name = "" , email= "" , password= "", sex= Sex.F , role= Role.Regular}): Promise<ServerResponse> {
        if (!isEmail(email))
            return ServerResponse.error(Message.INVALID_EMAIL , 400);
        let user ;
        try {
            user = await RepoService.getSingleton().userRepo.findOne({email}) ;
            if (user)
                return ServerResponse.error(Message.EMAIL_ALREADY_IN_USE  , 400);
            user = new User({name, email, password : bcrypt.hashSync(password, saltRounds), sex, role});
            user = await RepoService.getSingleton().userRepo.save(user);
        }
        catch (e) {
            return ServerResponse.error(e.message , 500);
        }
        return ServerResponse.success("", user);

    }

    async logout(): Promise<ServerResponse> {
        return ServerResponse.success();
    }

    async getUser(userId = -1, authDetail: IAuthDetails): Promise<ServerResponse> {
        const user = await RepoService.getSingleton().userRepo.findOne({id: userId}) ;
        if ( ! user)
            return ServerResponse.error(Message.USER_NOT_FOUND , 404);
        if (!Can.getUser(authDetail.user, user))
            return ServerResponse.error(Message.NO_PERMISSIONS , 401);
        if (user) {
            return ServerResponse.success("", user);
        }
        return ServerResponse.error(Message.USER_NOT_FOUND , 404);

    }

    async getUsers({offset = 0 , limit = 10}): Promise<ServerResponse> {
        const users: User[] = await RepoService.getSingleton().userRepo.find({
            skip: offset ,
            take: limit,
        }) ;
        if (!users)
            return ServerResponse.error(Message.USER_NOT_FOUND , 404);
        return ServerResponse.success("", users);
    }

    async updateUser(id= -1 , {name= "", password= "", sex= Sex.F, role= Role.Regular , email= ""}, authDetail: IAuthDetails): Promise<ServerResponse> {
        if (!isEmail(email))
            return ServerResponse.error(Message.INVALID_EMAIL , 400);
        if ( ! await RepoService.getSingleton().userRepo.findOne({id}))
            return ServerResponse.error(Message.USER_NOT_FOUND , 404);
        if (!Can.updateUser(authDetail.user , await RepoService.getSingleton().userRepo.findOne({id})))
            return ServerResponse.error(Message.NO_PERMISSIONS , 401);
        let result: UpdateResult;
        try{
            if (await RepoService.getSingleton().userRepo.findOne({email}))
                return ServerResponse.error(Message.EMAIL_ALREADY_IN_USE , 400);
            result = await RepoService.getSingleton().userRepo.update({id} , { name , password: bcrypt.hashSync(password, saltRounds) , sex , role });
        }
        catch ( err )
        {
            return ServerResponse.error(err.message , 500 ) ;
        }
        return ServerResponse.success("updation success" , result);
    }

    async createUser({name= "", password= "",  sex= Sex.F, role= Role.Regular , email= ""}, authDetail: IAuthDetails): Promise<ServerResponse> {

        if (!isEmail(email))
            return ServerResponse.error(Message.INVALID_EMAIL , 400);
        try {
            const user = new User({name , password : bcrypt.hashSync(password, saltRounds) , sex , role , email }) ;
            if (!Can.createUser( authDetail.user , user as User))
                return ServerResponse.error(Message.NO_PERMISSIONS , 401 );
            await RepoService.getSingleton().userRepo.save(user);
        }
        catch ( err )
        {
            return ServerResponse.error(err.message , 500);
        }
        return ServerResponse.success() ;
    }
    async deleteUser(id = -1, authDetail: IAuthDetails): Promise<ServerResponse>{
        const user =  await RepoService.getSingleton().userRepo.findOne({id}) ;
        if ( !user )
            return ServerResponse.error(Message.USER_NOT_FOUND , 400);
        if (!Can.deleteUser(authDetail.user, user))
            return ServerResponse.error(Message.NO_PERMISSIONS , 401);
        try {
            const result = await RepoService.getSingleton().userRepo.delete({id});
            return ServerResponse.success("", result);
        }
        catch (e) {
            return ServerResponse.error(e.message , 500) ;
        }
    }
}
