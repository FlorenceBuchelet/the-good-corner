import "reflect-metadata";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { AdResolver } from "./graphQL-resolvers/AdResolver";
import { CategoryResolver } from "./graphQL-resolvers/CategoryResolver";
import { UserResolver } from "./graphQL-resolvers/UserResolver";
import { buildSchema } from "type-graphql";
import { dataSource } from "./dataSource/dataSource";
import { cleanDB } from "./dataSource/cleanDB";
import { initTestData } from "./dataSource/initTestData";
import jwt from "jsonwebtoken";

const port = 4000;

// ------------- DATASOURCE 

export async function startServerApollo() {

    // 1. construction du schema à partir des resolvers
    const schema = await buildSchema({
        resolvers: [AdResolver, CategoryResolver, UserResolver],
        authChecker: ({context}, roles: string[]) => {
            console.log("contenu du context apollo :", context);
            if (context.user && (roles.length == 0 || roles.includes(context.user.role))) {
                return true;
            } else {
                return false;
            }
        }
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

    // 4. démarrage du serveur et transmission du JWT
    const { url } = await startStandaloneServer(server, {
        listen: { port },
        context: async ({ req }) => {
            const authHeader: string | undefined = req.headers.authorization;
            console.log("auth header in start apollo", authHeader);
            let user = null;
            if (authHeader?.startsWith('Bearer') === true) {
                console.log("authheader starts with Bearer");
                
                const tokenValue: string = authHeader.substring('Bearer '.length);
                if (!process.env.JWT_SECRET) {
                    console.log("secret is wrong");
                    
                    throw new Error('invalid JWT secret')
                }
                user = jwt.verify(tokenValue, process.env.JWT_SECRET)
                console.log("jwt verify result ", user);
            }
            return { user }
        }
    });

    console.log(`🚀  Server ready at: ${url}`);
}

startServerApollo();
