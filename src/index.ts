import { AppDataSource } from "./Type-ORM/data-source";
import { apolloServer } from "./Apollo/apolloServer";
import { setupSeeds } from "./Type-ORM/seeding/setupSeeds";

AppDataSource.initialize().then(async () => {

    await setupSeeds();

    console.log("Here you can setup and run express / fastify / any other framework.");
    
    await apolloServer();

}).catch(error => console.log(error));
