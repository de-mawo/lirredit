import "reflect-metadata";
import { COOKIE_NAME, __prod__ } from "./constants";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import session from "express-session";
import Redis from "ioredis";
import { MyContext } from "./types";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import cors from "cors";
import AppDataSource from "./typeorm.config";
// import { Post } from "./entities/Post";
// import { SendEmail } from "./utils/sendEmail";


let RedisStore = require("connect-redis")(session);

const main = async () => {

  // SendEmail("demawo@inogital.com", "Ko Ndochii ichocho")
await AppDataSource.initialize().then(() => {
  console.log("Data Source has been initialized!")
})
.catch((err) => {
  console.error("Error during Data Source initialization", err)
})

await AppDataSource.runMigrations();


  const app = express();
 
  
  const redis = new Redis()

  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }))

  app.use(
    session({
        name: COOKIE_NAME,
      store: new RedisStore({ client: redis, disableTouch: true}),
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 Years
        httpOnly: true,
        sameSite: 'lax', // csrf
        secure: __prod__, // cookie only works in https
      },
      secret: "kubhilivisanaka1",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res}): MyContext => ({ req, res, redis }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("listening on port:4000");
  });
};

main().catch((err) => {
  console.error(err);
});


