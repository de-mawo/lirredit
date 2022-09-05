import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import { User } from "./entities/User";

export default {
    migrations: {
        path: process.cwd() + '/migrations', // path to folder with migration files
        glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
    },
    entities: [Post, User],
    dbName: "lireddit",
    type: "postgresql",
    debug: !__prod__,
    allowGlobalContext: true,
} as Parameters<typeof MikroORM.init>[0];

