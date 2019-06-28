import {TypeOrmModule} from "@nestjs/typeorm";
import {Test, TestingModule} from "@nestjs/testing";
import {UserController} from "../app/user/user.controller";
import {UserModule} from "../app/user/user.module";
import awaitTo from "async-await-error-handling";
import {Module} from "@nestjs/core/injector/module";
import {ConnectionOptions} from "typeorm";
import {User} from "../database/entity/user.entity";

export const connectionOptionsTest: ConnectionOptions = {
    type: "sqlite",
    synchronize: false,
    database: "data/databseTest.sqlite",
    migrations: [`${__dirname}/database/migration/*{.ts,.js}`],
    entities: [`${__dirname}/database/entity/*{.ts,.js}`],
    cli: {
        migrationsDir: `src/database/migration`,
        entitiesDir: `src/database/entity`,
    }
};

describe("UserController",  () => {
    let module: any ;
    let userController: any;
    beforeEach( async () => {
        module = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot(connectionOptionsTest), UserModule , User
            ],
        }).compile();
        userController = module.get(UserController);
    });
    describe("World", () => {
            it("should not login user on empty database", async () => {
                // jest.spyOn<UserService, any>(userService, "login").mockImplementation(() => retVal);
                const retVal = await userController.login({email: "test@gmil.com", password: "pass1234"});
                expect(retVal.success).toBe(false);
                console.log(retVal);
            });
            it("should register user", async () => {
                const retVal = await userController.register({email: "abc@gmail.com", pass: "pass"});
                expect(retVal.success).toBe(true);
                console.log(retVal);
            });
            it("should not login user on wrong password", async () => {
                const retVal = await userController.login({email: "abc@gmail.com", pass: "pass123"});
                expect(retVal.success).toBe(false);
                console.log(retVal);
            });
            it("should login user", async () => {
                const retVal = await userController.login({email: "abc@gmail.com", pass: "pass"});
                expect(retVal.success).toBe(true);
                console.log(retVal);
            });
        });

});

// describe("UserController", () => {
//     let userController: UserController;
//     let userService: UserService;
//
//     beforeEach(async () => {
//         const module = await Test.createTestingModule({
//             controllers: [UserController],
//             providers: [UserService],
//         }).compile();
//
//         userService = module.get<UserService>(UserService);
//         userController = module.get<UserController>(UserController);
//     });
//
//     describe("findAll", () => {
//         it("should return an array of user", async () => {
//             const result = ["test"];
//             jest.spyOn(userService, "findAll").mockImplementation(() => result);
//
//             expect(await userController.findAll()).toBe(result);
//         });
//     });
// });
