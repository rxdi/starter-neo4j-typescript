
# @Starter Neo4J Graph Typescript

#### To start developing clone repository

```bash
git clone https://github.com/rxdi/starter-neo4js-typescript
```

#### Install @gapi command line interface and typescript node
```bash
cd starter-neo4js-typescript && npm i
```

#### Download Neo4J database https://neo4j.com/download/

> Follow the steps and create your Graph using interface provided and set password to it

> default username for neo4j is `neo4j`

> You only need to setup `password` field


```typescript
import { CoreModule, Module } from "@gapi/core";
import { VoyagerModule } from "@gapi/voyager";
import { Neo4JModule } from "@rxdi/neo4j";
import { AppController } from "./app.controller";

@Module({
  controllers: [AppController],
  imports: [
    CoreModule.forRoot(),
    Neo4JModule.forRoot({
      password: "your-password",
      username: "neo4j",
      address: "bolt://localhost:7687"
    }),
    VoyagerModule.forRoot()
  ]
})
export class AppModule {}

```

#### App Controller
```typescript
import { Controller, GraphQLList, Query, Type } from "@gapi/core";
import { graphRequest } from "@rxdi/neo4j";
import { Movie } from "./movie.type";
import { Genre } from "./genre.type";

@Controller()
export class AppController {
  @Type(new GraphQLList(Movie))
  @Query()
  Movie(root, params, ctx, resolveInfo) {
    return graphRequest(root, params, ctx, resolveInfo);
  }

  @Type(new GraphQLList(Genre))
  @Query()
  Genre(root, params, ctx, resolveInfo) {
    return graphRequest(root, params, ctx, resolveInfo);
  }
}
```

#### Movie Type

```typescript
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList
} from "graphql";
import { Genre } from "./genre.type";

export const Movie = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    title: {
      type: GraphQLString
    },
    year: {
      type: GraphQLInt
    },
    imdbRating: {
      type: GraphQLFloat
    },
    genres: {
      relation: {
        name: "IN_GANRE",
        direction: "OUT"
      },
      type: new GraphQLList(Genre)
    }
  })
});

```


#### Genre Type

```typescript
import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import { Movie } from "./movie.type";

export const Genre = new GraphQLObjectType({
  name: "Genre",
  fields: () => ({
    name: {
      type: GraphQLString
    },
    movies: {
      relation: {
        name: "IN_GANRE",
        direction: "IN"
      },
      type: new GraphQLList(Movie)
    }
  })
});

```



#### Start application
> Wait for about 5 seconds and browser will be started leading you to Graphiql panel

```
npm start
```


#### Build application

> Build is accomplished with [ParcelJS](https://parceljs.org) internally inside [@gapi/cli](https://github.com/Stradivario/gapi-cli/wiki/build)

```
npm run build
```


#### Clean build

```
npm run clean
```


#### Open voyager panel

```
http://0.0.0.0:9000/voyager
```


![voyager](https://ipfs.io/ipfs/QmWNEZANeePQLpY9P7AX4Kz6gwt7Z67NsxJhQy6GmXByo5)


#### Open graphiql DevTools
```
http://0.0.0.0:9000/devtools
```

#### Example

1. Create `Movie`

```graphql
mutation {
  CreateMovie(title: "Titanic", year: 1990, imdbRating: 1) {
    title
    year
    genres {
      name
    }
  }
}
```

2. Create `Genre`
```graphql
mutation {
  CreateGenre(name: "Drama") {
    name
    movies {
      title
      year
      imdbRating
    }
  }
}
```

3. Create `Relationship` between Genre `Drama` and Movie `Titanic`

```graphql
mutation {
  AddGenreMovies(from: { title: "Titanic" }, to: { name: "Drama" }) {
    from {
      title
    }
    to {
      name
    }
  }
}
```

4. List Genres

```graphql
query {
  Genre {
    name
    movies {
      title
    }
  }
}
```

5. List Movies

```graphql
query {
  Movie {
    title
    year
    genres {
      name
    }
  }
}
```

Notice that both objects are linked
