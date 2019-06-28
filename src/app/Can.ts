import {User} from "../database/entity/user.entity";
import {Role} from "../enums/UserEnums";
import {Home} from "../database/entity/home.entity";

class Can {
    static createUser(currentUser: User, user: User) {
        if (currentUser.role === Role.Admin)
            return true;
    }
    static getUser(currentUser: User, user: User){
        if (currentUser.role === Role.Admin || currentUser.id === user.id)
            return true;
        return false;
    }

    static updateUser(currentUser: User, user: User){
        return this.getUser(currentUser, user);
    }

    static deleteUser(currentUser: User, user: User){
        return this.getUser(currentUser, user);
    }

    static createHome(currentUser: User){
        if (currentUser.role === Role.Admin || currentUser.role === Role.Manager)
            return true;
        return false;
    }

    static searchHome(user: User) {
        return true;
    }

    static updateHome(user: User, home: Home) {
        if (user.role === Role.Admin || (user.role === Role.Manager && home.userId === user.id) )
            return true ;
        return false ;
    }

    static getHome(currentUser: User, home: Home) {
        return true;
    }

    static deleteHome(user: User , home: Home) {
        if (user.role === Role.Admin || user.id === home.userId)
            return true;
        return false;
    }
}

export default Can;
