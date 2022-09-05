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


