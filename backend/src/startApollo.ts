import "reflect-metadata";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { AdResolver } from "./graphQL-resolvers/AdResolver";
import { CategoryResolver } from "./graphQL-resolvers/CategoryResolver";
import { buildSchema } from "type-graphql";
import { dataSource } from "./dataSource/dataSource";
import { cleanDB } from "./dataSource/cleanDB";
import { initTestData } from "./dataSource/initTestData";

const port = 4000;

// ------------- DATASOURCE 

export async function startServerApollo() {

    // 1. construction du schema à partir des resolvers
    const schema = await buildSchema({
        resolvers: [AdResolver, CategoryResolver],
    });
    
    // 2. transmettre le schema à Apollo pour démarrage du serveur
    const server = new ApolloServer({
        schema
    });

    // 3. initialisation de la datasource TypeORM
    await dataSource.initialize();
    // 3bis. appel des autres services d'initialisation
    // await cleanDB();
    // await initTestData();

    // 4. démarrage du serveur
    const { url } = await startStandaloneServer(server, {
        listen: { port },
    });

    console.log(`🚀  Server ready at: ${url}`);
}

startServerApollo();
