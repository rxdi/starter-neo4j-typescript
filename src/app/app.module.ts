import { CoreModule, Module } from "@gapi/core";
import { VoyagerModule } from "@gapi/voyager";
import { Neo4JModule } from "@rxdi/neo4j";
import { AppController } from "./app.controller";

@Module({
  controllers: [AppController],
  imports: [
    CoreModule.forRoot(),
    Neo4JModule.forRoot({
      password: "123456",
      username: "test1",
      address: "bolt://localhost:7687"
    }),
    VoyagerModule.forRoot()
  ]
})
export class AppModule {}
