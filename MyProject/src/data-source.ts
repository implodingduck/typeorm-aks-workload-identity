import "reflect-metadata"
import { DataSource } from "typeorm"
import { Employees } from "./entity/Employees"

export const AppDataSource = new DataSource({
    type: "mssql",
    host: process.env.SQL_HOST || "localhost",
    username: process.env.SQL_USER || "sa",
    password: process.env.SQL_PASSWORD || "",
    database: process.env.SQL_DB || "testdb",
    synchronize: false,
    logging: false,
    entities: [Employees],
    migrations: [],
    subscribers: [],
})
