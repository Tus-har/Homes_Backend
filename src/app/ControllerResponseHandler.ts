import {HttpException} from "@nestjs/common";
import ServerResponse from "../ServerResponse";

export function ControllerRetvalHandler(target: any, propertyName: string, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args) {
        const retVal: ServerResponse = await originalMethod.call(this, ...args);

        if (retVal.success) {
            return {message: retVal.message, value: retVal.value};
        } else {
            throw new HttpException(retVal.message, retVal.httpCode);
        }
    };
    return descriptor;
}
