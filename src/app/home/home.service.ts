import { Injectable } from "@nestjs/common";
import {HomeAvailabilityEnum} from "../../enums/HomeEnums";
import RepoService from "../../database/repositories/RepoService";
import {Home} from "../../database/entity/home.entity";
import {User} from "../../database/entity/user.entity";
import ServerResponse from "../../ServerResponse";
import {Message} from "../../constant";
import {IAuthDetails} from "../../interfaces/IAuthDetails";
import Can from "../Can";
import {Between, Like} from "typeorm";

@Injectable()
export class HomeService {
    async searchHome({address= "", roomMin= -1, roomMax= 999999 , rentMin= -1 , rentMax= 999999, areaMin= -1, areaMax= 999999, offset= 0, limit= 999999}, authDetail: IAuthDetails) {
        if (!Can.searchHome(authDetail.user))
            return ServerResponse.error(Message.NO_PERMISSIONS , 401);
        try {
            const homes: Home[] = await RepoService.getSingleton().homeRepo.find({
                skip: offset ,
                take: limit ,
                where: {
                    rent: Between(rentMin , rentMax) ,
                    totalArea: Between(areaMin , areaMax),
                    totalRooms: Between(roomMin , roomMax),
                    address: Like(`%${address}%`),
                }
            });
            if (!homes)
                return ServerResponse.error(Message.HOME_NOT_FOUND , 404);
            return ServerResponse.success("", homes );
        }
        catch (e) {
            return ServerResponse.error(e.message , 500 );
        }
    }

    async updateHome(id = -1 , title = "", available = HomeAvailabilityEnum.AVAILABLE, rent= 0, totalRooms= 0, totalArea= 0, address= "", latitude= 0, longitude= 0, userId = 0 , authDetail: IAuthDetails) {
        if (!Can.updateHome(authDetail.user , await RepoService.getSingleton().homeRepo.findOne({id})))
            return ServerResponse.error(Message.NO_PERMISSIONS , 401);
        try {
            const user: User = await RepoService.getSingleton().userRepo.findOne({id: userId}) ;
            if (!user)
                return ServerResponse.error(Message.USER_NOT_FOUND , 404);
            await RepoService.getSingleton().homeRepo.update({id}, {
                title,
                available,
                address,
                rent,
                totalRooms,
                totalArea,
                latitude,
                longitude,
                user
            });
        } catch (e) {
            return ServerResponse.error(e.message , 500 );
        }
        return ServerResponse.success(Message.HOME_UPDATED);
    }

    async createHome(title = "", available = HomeAvailabilityEnum.AVAILABLE, rent= 0, totalRooms= 0, totalArea= 0, address= "", latitude= 0, longitude= 0, userId = 0 , authDetail: IAuthDetails) {
        if (!Can.createHome(authDetail.user))
            return ServerResponse.error(Message.NO_PERMISSIONS , 401);

        const home = new Home({ title , available , rent, totalRooms , totalArea , address , latitude , longitude}) ;
        let user: User ;
        try {
            user = await RepoService.getSingleton().userRepo.findOne({id: userId});
            if (!user)
                return ServerResponse.error(Message.USER_NOT_FOUND , 404 ) ;
        }
        catch (e) {
            return ServerResponse.error(e.message , 500 );
        }
        home.user = user;
        let saveResult ;
        try {
            saveResult = await RepoService.getSingleton().homeRepo.save(home);
        }
        catch (e) {
            return ServerResponse.error(e.message , 500 ) ;
        }
        return ServerResponse.success(Message.HOME_CREATED, saveResult);

    }

    async getHome(id = 0, authDetail: IAuthDetails) {
        const home = await RepoService.getSingleton().homeRepo.findOne({id});
        if (!home)
            return ServerResponse.error(Message.HOME_NOT_FOUND , 404) ;

        if (!Can.getHome(authDetail.user , home))
            return ServerResponse.error(Message.NO_PERMISSIONS , 401);
        return ServerResponse.success("", home);
    }

    async deleteHome(id = -1, authDetail: IAuthDetails): Promise<ServerResponse>{
        const home = await RepoService.getSingleton().homeRepo.findOne({id}) ;
        if ( ! home)
            return ServerResponse.error(Message.HOME_NOT_FOUND , 404);
        if (!Can.deleteHome(authDetail.user, home))
            return ServerResponse.error(Message.NO_PERMISSIONS , 401);
        try {
            const result = await RepoService.getSingleton().homeRepo.delete({id});
            return ServerResponse.success("", result);
        }
        catch (e) {
            return ServerResponse.error(e.message , 500) ;
        }
    }
}
