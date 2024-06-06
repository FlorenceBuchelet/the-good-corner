import "reflect-metadata";
import express from "express";
import fs from 'node:fs';
import { DataSource } from "typeorm";

const app = express();
const port = 4000;

app.use(express.json());

// TypeORM setup
// Datasource
export const dataSource = new DataSource({
    type: "sqlite",
    database: `${__dirname}../../database/good_corner.sqlite`,
    entities: [`${__dirname}/entities/*.ts`],
    synchronize: true,
});

/**
 * MOVIES
 */

// make CSV workable
const movies: string = fs.readFileSync(`${__dirname}/movies.csv`, { encoding: 'utf-8' });
const moviesLines: string[] = movies.split('\n');
const allMovies: any = [];
moviesLines.forEach((movie) => {
    const singleMovie: string[] = movie.split(";")
    allMovies.push(singleMovie);
})

// retourne le nombre de films dans le fichier
app.get('/movies/count', (req, res) => {
    console.log(allMovies);

    console.log(`There are ${moviesLines.length - 1} movies in our list.`);
});

// budget nécessaire pour voir tous les films
app.get('/movies/totalBudget', (req, res) => {

    let budget: number = 0;
    for (let i = 1; i < allMovies.length; i++) {
        budget = budget + parseInt(allMovies[i][3]);
    }
    console.log(`You need ${budget} dollarz to see all this`);
});

// query string use
app.get('/movies', (req, res) => {
    let response: string[] = [];
    if (req.query.minYear) {
        for (let i = 1; i < allMovies.length; i++) {
            if (allMovies[i][2] > req.query.minYear) {
                response.push(allMovies[i]);
            }
        }
    } else if (req.query.requestedTime) {
        // si requestedTime return les films qui ont une séance à cette heure
        for (let i = 1; i < allMovies.length; i++) {
            if (allMovies[i][4].includes(req.query.requestedTime)) {
                response.push(allMovies[i]);
            }
        }
    }
    console.log("Here's your list: ", response);
});


app.listen(port, async () => {
    await dataSource.initialize();
    console.log(`Example app listening on port ${port}`);
});
