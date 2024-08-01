import { DataSource } from "typeorm";

export const dataSource = new DataSource({
    // paramètres liés à la BDD
    type: 'postgres',
    host: 'db',
    port: 5432,
    database: 'the_good_corner',
    username: "the_good_corner_user",
    password: process.env.TGC_DBPASS,

    // paramètres liés à typeORM
    entities: ['src/entities/*.ts'], 
    synchronize: true,
    logging: true
});