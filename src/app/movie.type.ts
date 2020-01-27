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
