import { DataSource } from "typeorm";

export const dataSource = new DataSource({
    type: 'sqlite',
    database: './database/good_corner.sqlite',
    entities: ['src/entities/*.ts'],
    synchronize: true,
    logging: true
});