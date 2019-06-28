import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import ServerResponse from "../../ServerResponse";
import {oc} from "ts-optchain";
import GuardUtil from "./guardUtil";

@Injectable()
class AuthenticationGuard implements CanActivate {

    async canActivate(context: ExecutionContext): | Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const jwtToken = oc<any>(request).headers.jwttoken("");
        const validationResponse: ServerResponse = await GuardUtil.validateJWTToken(jwtToken);
        if (validationResponse.success){
            request.user = validationResponse.value;
            request.jwtToken = jwtToken;
            return true;
        } else {
            return false;
        }

    }
}

export default AuthenticationGuard;
