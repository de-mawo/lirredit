import { DataSource } from "typeorm";
import { Post } from "./entities/Post";
import { User } from "./entities/User";
import path from 'path'
import { Updoot } from "./entities/Updoot";




const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "lireddit2",
    logging: true,
    synchronize: true,
    entities: [
       Post, User, Updoot
    ],
   migrations: [ path.join(__dirname, "./migrations/*") ],

})



export default AppDataSource