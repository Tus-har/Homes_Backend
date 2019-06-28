import {Entity, Column, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import {Role, Sex} from "../../enums/UserEnums";
import {Home} from "./home.entity";
import Model from "../Model";

@Entity({name: "Users"})
export class User extends Model<User>{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    sex: Sex;

    @Column({default : Role.Regular})
    role: Role;

    @OneToMany(() => Home, home => home.id)
    homes: Home[];

    toJson() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            sex: this.sex,
            role: this.role,
        };
    }
}
