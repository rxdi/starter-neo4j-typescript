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
