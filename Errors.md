#### Validation Error: Using global entity manager instance methods for context specific actions is disallowed

https://stackoverflow.com/questions/71117269/validation-error-using-global-entity-manager-instance-methods-for-context-speci

#### Solution
``` 
const post = orm.em.fork({}).create(Post, {
    title: "my first post",
  }); 
```
#### Argument of type '{ title: string; }' is not assignable to parameter of type 'RequiredEntityData<Post>'

https://stackoverflow.com/questions/71379477/argument-of-type-title-string-is-not-assignable-to-parameter-of-type-re

#### Solution
```
[OptionalProps]?: "title" | "updateAt" | "createdAt"; // See the implementation in Posts Entities
```



Zero Brainy
3 months ago (edited)
I am going through this tutorial now, and it's been a while since it has been released, so I'll add any major things that I've had to do to go through it, with timestamps on when I encountered the issue in the video:

~30min, had the error  Argument of type '{ title: string; }' is not assignable to parameter of type 'RequiredEntityData<Post>' . I added the following line of code in the Post.ts file:

...
export class Post {  //add the following under this line
[OptionalProps]?: 'updatedAt' | 'createdAt'; 
...


This marks the property as optional because it has a database default.


at min 46:
First, I had to install graphql ver 15.3.0 to get it to work with my system. Then I needed to add 

await apolloServer.start();
//before this existing line:
apolloServer.applyMiddleware({ app })


min55:
Did not install reflect metadata, no errors on my end.

~min1:40:
I use windows and did not have redis. To install it, I used this video: https://www.youtube.com/watch?v=_nFwPTHOMIY Simple walkthrough

~min 1:50 :
 - I had installed the new apollo version during setup. I had to revert to the version used in the video, because it would not work otherwise.
- I had to make a slight modifcation to types.ts, due to the fact that express-session was version 1.17.3 rather than 1.17.0 used in the video:
em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;

~3h - I ran into a frustrating issue where the cors just stopped working. A few hrs of troubleshooting later (no joke) I found that I could solve it by placing the cors options in the apolloserver.applymiddleware. So if you run into this, rather than using the cors package (don't know if it will be of use later in the course), add this to your existing function in index.ts of the server:

```
    apolloServer.applyMiddleware({ app, //this should already exist in your file
        cors: {
            origin: ["http://localhost:3000",],
            credentials: true
        },
    });
    ```

3:50:52 - with the newest version of nextjs, you do not need the isomorphic-unfetch package, so you can leave that one out.

4:10:40 - when I set the pause option to true using the isServer function, I get a Hydration failed error. It seems that the newer vers of next doesn't like the fact that what's rendered on the server and what's rendered on the client side is not the same. See David Glymph's solution below  (taken from his comment to this post):
useEffect only runs in the browser, so just set state, which will rerender the page

  const [isServer, setIsServer] = useState(true);

  useEffect(() => setIsServer(false), []);

4:44:50 - the redis.set needs to have uppercase EX as an argument, not lowercase ex in the latest version

5:33:10 - this is how I needed to run the post query to not encounter errors:    
post(@Arg('id') id: number): Promise<Post | null > {
        return Post.findOne({where: {id}});
    }

5:34:45 - see above

5:35:18 - await Post.delete({ id });

5:35:47 - const user = await User.findOne({where: {id: parseInt(userId)}});

5:55:17 - had to install postgres via yarn add pg

6:06:30 - the types between textarea and input are not the same, to fix it I had to cast inputOrTextArea as any like this:
let InputOrTextarea = Input as any // line 28 in the video
There's definitely a better solution, but didn't want to spend too long in this.

7:35:50 - the npx typeorm migration:create -n FakePosts did not work for me. In the newer version of typeorm, you have to specify the location, so I did:
npx typeorm migration:create ./src FakePosts

