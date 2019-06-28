import {Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards} from "@nestjs/common";
import {UserService} from "./user.service";
import AuthenticationGuard from "../gaurds/AuthenticationGuard";
import ServerResponse from "../../ServerResponse";
import {AuthDetail} from "../../interfaces/IAuthDetails.decorator";
import {IAuthDetails} from "../../interfaces/IAuthDetails";
import {ControllerRetvalHandler} from "../ControllerResponseHandler";

@Controller("user")
export class UserController {

    constructor(private readonly userService: UserService) {}

    // @Get("")
    // @ControllerRetvalHandler
    // async hello(): Promise<string>{
    //     return "Hello World";
    // }

    @Post("/login")
    @ControllerRetvalHandler
    async login( @Body() body  ): Promise<any> {
        const { email , password } = body ;
        console.log(email, password);
        return this.userService.login(email, password) ;
    }

    @Post("/register")
    @ControllerRetvalHandler
    async register( @Body() body): Promise<any> {
        const { name= "" , email= "", password= "", sex, role} = body ;
        return this.userService.register({name , email: email.trim() , password , sex , role } );
    }

    @Get("/logout")
    @UseGuards(AuthenticationGuard)
    @ControllerRetvalHandler
    async logout(): Promise<any> {
        return this.userService.logout();
    }

    @Get("/user")
    @UseGuards(AuthenticationGuard)
    @ControllerRetvalHandler
    async getUsers(@Param() param ): Promise<any> {
        const { offset= 0 , limit= 20 } = param ;
        return this.userService.getUsers( {offset, limit});
    }

    @Get(":id")
    @UseGuards(AuthenticationGuard)
    @ControllerRetvalHandler
    async getUser(@Param("id") id: number , @AuthDetail() authDetail: IAuthDetails): Promise<ServerResponse> {
        return this.userService.getUser( id, authDetail);
    }

    @Put(":id")
    @UseGuards(AuthenticationGuard)
    @ControllerRetvalHandler
    async updateUser( @Param("id") id: number , @Body() body , @AuthDetail() authDetail: IAuthDetails ): Promise<ServerResponse> {
        const { name , password , sex, role , email= "" } = body ;
        return this.userService.updateUser( id , { name, password , sex , role , email : email.trim() }, authDetail);
    }

    @Post()
    @ControllerRetvalHandler
    async createUser(@Body() body , @AuthDetail() authDetail: IAuthDetails ): Promise<ServerResponse> {
        const { name , password , sex, role , email} = body ;
        return this.userService.createUser({ name, password , sex, role , email: email.trim() }, authDetail);
    }

    @Delete(":id")
    @ControllerRetvalHandler
    async deleteUser(@Param("id") id: number , @AuthDetail() authDetail: IAuthDetails): Promise<ServerResponse>{
        return this.userService.deleteUser(id , authDetail);
    }

}
