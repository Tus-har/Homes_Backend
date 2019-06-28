import {Factory, Seeder} from "typeorm-seeding";
import {Connection} from "typeorm";
import {Home} from "../entity/home.entity";
import faker from "faker" ;
import {HomeAvailabilityEnum} from "../../enums/HomeEnums";
import RepoService from "../repositories/RepoService";
import {User} from "../entity/user.entity";
import * as bcrypt from "bcryptjs";
import {saltRounds} from "../../constant";
import {Role, Sex} from "../../enums/UserEnums";
export class Seeds implements Seeder{
    async run(factory: Factory, connection: Connection): Promise<void> {
        for (let i = 0 ; i < 15 ; i++){
            const temp = faker.name.firstName() ;
            const user = new User({
                name : temp ,
                password : bcrypt.hashSync(temp, saltRounds) ,
                sex : Sex.M ,
                email : faker.internet.email(),
                role : Role.Regular,
            });
            await RepoService.getSingleton().userRepo.save(user);
        }
        for (let i = 0 ; i < 200 ; i++){
            const home = new Home(
            {title: faker.random.word(),
                available: HomeAvailabilityEnum.AVAILABLE,
                rent: faker.random.number(),
                totalRooms: Math.floor(Math.random() * 6) + 1,
                totalArea: faker.random.number(),
                address: faker.address.city(),
                latitude: faker.random.number(),
                longitude: faker.random.number(),
                user: await RepoService.getSingleton().userRepo.findOne({id: Math.floor(Math.random() * 14) + 1})}
            );
            await RepoService.getSingleton().homeRepo.save(home);
        }
    }
}
