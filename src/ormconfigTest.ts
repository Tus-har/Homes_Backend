import {ConnectionOptions} from "typeorm";
const connectionOptionsTest: ConnectionOptions = {
    type: "sqlite",
    synchronize: false,
    database: "data/databseTest.sqlite",
    migrations: [`${__dirname}/database/migration/test/*{.ts,.js}`],
    entities: [`${__dirname}/database/entity/*{.ts,.js}`],
    cli: {
        migrationsDir: `src/database/migration/test`,
        entitiesDir: `src/database/entity`,
    }
};
export = connectionOptionsTest ;
