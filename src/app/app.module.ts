import { Module } from "@nestjs/common";
import {UserModule} from "./user/user.module";
import {HomeModule} from "./home/home.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import {Connection} from "typeorm";
import connectionOptions from "../ormconfig";

@Module({

    imports: [UserModule, HomeModule, TypeOrmModule.forRoot(connectionOptions)]
})

export class AppModule {
    constructor(readonly connection: Connection) {
        console.log("Connection created", this.connection);
    }
}
