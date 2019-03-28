import { CoreModule, Module, Bootstrap } from "@gapi/core";
import { VoyagerModule } from "@gapi/voyager";
import { Neo4JModule } from "@rxdi/neo4j";
import { GraphQLObjectType, GraphQLString } from "graphql";

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    }
  })
});

@Module({
  imports: [
    CoreModule.forRoot(),
    Neo4JModule.forRoot({
      types: [UserType],
      password: "your-password",
      graphName: "neo4j",
      graphAddress: "bolt://localhost:7687"
    }),
    VoyagerModule.forRoot()
  ]
})
export class AppModule {}

Bootstrap(AppModule).subscribe();
