import { DataSource } from "typeorm";
import { Post } from "./entities/Post";
import { User } from "./entities/User";




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
       Post, User
    ],

})



export default AppDataSource