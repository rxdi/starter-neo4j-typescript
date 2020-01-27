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
