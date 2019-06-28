import {HomeService} from "./home.service";
import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from "@nestjs/common";
import AuthenticationGuard from "../gaurds/AuthenticationGuard";
import ServerResponse from "../../ServerResponse";
import {AuthDetail} from "../../interfaces/IAuthDetails.decorator";
import {IAuthDetails} from "../../interfaces/IAuthDetails";
import {ControllerRetvalHandler} from "../ControllerResponseHandler";

@Controller("home")
@UseGuards(AuthenticationGuard)
export class HomeController {

    constructor(private readonly homeService: HomeService) {}

    @Get(":id")
    @ControllerRetvalHandler
    async getHome( @Param("id") id: number , @AuthDetail() authDetail: IAuthDetails): Promise<any> {
        return this.homeService.getHome(id , authDetail);
    }
    @Post()
    @ControllerRetvalHandler
    async createHome( @Body() body , @AuthDetail() authDetail: IAuthDetails): Promise<ServerResponse> {
        const { title , available , rent, totalRooms , totalArea , address , latitude , longitude , userId } = body ;
        return this.homeService.createHome(title , available , rent, totalRooms , totalArea , address , latitude , longitude , userId , authDetail);
    }
    @Put(":id")
    @ControllerRetvalHandler
    async updateHome(@Param("id") id: number , @Body() body , @AuthDetail() authDetail: IAuthDetails): Promise<any> {
        const { title  , available , rent, totalRooms , totalArea , address , latitude , longitude , userId} = body ;
        return this.homeService.updateHome(id , title , available , rent, totalRooms , totalArea , address , latitude , longitude , userId , authDetail);
    }
    @Post("/search")
    @ControllerRetvalHandler
    async searchHome(@Body() body , @AuthDetail() authDetail: IAuthDetails): Promise<any> {
        console.log("serach");
        console.log(body.offset);
        const { offset , limit , address , roomMin , roomMax , rentMin , rentMax , areaMin , areaMax } = body;
        return this.homeService.searchHome({ address , roomMin , roomMax , rentMin , rentMax , areaMin , areaMax, offset, limit }, authDetail);
    }

    @Delete(":id")
    @ControllerRetvalHandler
    async deleteHome(@Param("id") id: number , @AuthDetail() authDetail: IAuthDetails): Promise<ServerResponse> {
        return this.homeService.deleteHome(id , authDetail) ;
    }
}
