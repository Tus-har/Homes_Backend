import {getRepository, Repository} from "typeorm";
import {Home} from "../entity/home.entity";
import {User} from "../entity/user.entity";

class RepoService {
    userRepo: Repository<User>;
    homeRepo: Repository<Home>;

    static instance: RepoService;

    static getSingleton(): RepoService {
        if (!this.instance) {
            this.instance = new RepoService();
        }
        return this.instance;
    }

    private constructor() {
        this.userRepo = getRepository<User>(User);
        this.homeRepo = getRepository<Home>(Home);
    }
}
export default RepoService;
