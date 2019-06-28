import * as jwt from "jsonwebtoken";
import moment from "moment";
import UUIDV4 from "uuid/v4";
import ServerResponse from "../../ServerResponse";
import {Message , privateKey , JWT_EXPIRATION_SECONDS} from "../../constant";
import {User} from "../../database/entity/user.entity";
import RepoService from "../../database/repositories/RepoService";
class GuardUtil {

    static generateJWTToken(user: User): string {
        const payload = {
            user_id: user.id,
            random: UUIDV4(),
            expireAt: moment().add(JWT_EXPIRATION_SECONDS, "seconds").toISOString()
        };
        return jwt.sign(payload, privateKey);
    }

    static async validateJWTToken(jwtToken: string): Promise<ServerResponse> {
        let user: User ;
        try {
            const decoded: any = jwt.verify(jwtToken, privateKey);
            const {user_id , expireAt } = decoded;
            if (expireAt < moment())
                return ServerResponse.error(Message.AUTHENTICATION_TOKEN_EXPIRED , 401);
            user = await RepoService.getSingleton().userRepo.findOne({id: user_id});
        }
        catch (e) {
            return ServerResponse.error(Message.UNAUTHORIZED_ACCESS , 401);
        }
        return ServerResponse.success(Message.ACCESS_GRANTED, user);
    }

}

export default GuardUtil;
