import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";
import {HomeAvailabilityEnum} from "../../enums/HomeEnums";
import Model from "../Model";

@Entity()
export class Home extends Model<Home>{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name : "user_id"})
    userId: number;

    @Column()
    title: string;

    @Column()
    available: HomeAvailabilityEnum; //  TODO capital

    @Column()
    rent: number;

    @Column()
    totalRooms: number;

    @Column()
    totalArea: number;

    @Column()
    address: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @ManyToOne(() => User, user => user.id)
        @JoinColumn({name: "user_id"})
    user: User;
}
