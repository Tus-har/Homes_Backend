import {ConnectionOptions} from "typeorm";
const connectionOptions: ConnectionOptions = {
    type: "sqlite",
    synchronize: false,
    database: "data/databse.sqlite",
    migrations: [`${__dirname}/database/migration/*{.ts,.js}`],
    entities: [`${__dirname}/database/entity/*{.ts,.js}`],
    cli: {
        migrationsDir: `src/database/migration`,
        entitiesDir: `src/database/entity`,
    }
};
export = connectionOptions ;
