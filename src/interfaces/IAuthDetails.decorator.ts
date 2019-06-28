import {createParamDecorator, UnauthorizedException} from "@nestjs/common";
import {User} from "../database/entity/user.entity";
import {IAuthDetails} from "./IAuthDetails";

export const AuthDetail = createParamDecorator((data, req): IAuthDetails => {
    const user: User = req.user;
    if (!user) {
        throw new UnauthorizedException();
    }
    return {user};
    });
