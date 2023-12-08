import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { LoginItem } from "./entity/LoginItem";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "firepass",
    password: "firepass",
    database: "firepass",
    synchronize: true,
    logging: false,
    entities: [User, LoginItem],
    migrations: [],
    subscribers: [],
});
