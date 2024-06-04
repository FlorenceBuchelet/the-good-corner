import "reflect-metadata";
import express from "express";
import fs from 'node:fs';
import { DataSource } from "typeorm";
import { Ad } from "./entities/Ad";
import { Category } from "./entities/Category";

const app = express();
const port = 3000;

app.use(express.json());

// TypeORM setup
// Datasource
export const dataSource = new DataSource({
    type: "sqlite",
    database: `${__dirname}../../database/good_corner.sqlite`,
    entities: [`${__dirname}/entities/*.ts`],
    synchronize: true,
});

// Classes

class Ad {
    #id: number;
    #title: string;
    #description?: string;
    #author: string;
    #price: number;
    #createdAt: Date;
    #picture?: string;
    #city: string;
    #category_id?: number;


}

// ----------------------------------------------
// Router 

// HOME
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// ADS
// GET all ads (number and content) or per city
/* app.get("/ads", (req, res) => {
    if (!req.query.city && !req.query.category) {
        db.all("SELECT * FROM `ad`;", (err, rows) => {
            res.send(rows);
            console.log('GET ads requested: ', rows.length, ' ads returned');
        })
    } else if (req.query.city) {
        db.all(`SELECT * FROM ad WHERE city='${req.query.city}';`, (err, rows) => {
            res.send(rows);
            console.log(`GET ads requested: ${rows.length} ads in ${req.query.city}`);
        })
    } else if (req.query.category) {
        db.all(`SELECT * FROM ad
                JOIN category ON category.id = ad.category_id
                WHERE category.title = '${req.query.category}';`,
            (err, rows) => {
                res.send(rows);
                console.log(`GET ads requested: ${rows.length} ads in ${req.query.category}`);
            })
    }
}); */

// one or more categories
/* app.get("/ads/category", (req, res) => {
    const initialQuery = `SELECT * FROM ad 
                            JOIN category ON category.id = ad.category_id
                            WHERE `;
    let bodyQuery = `category.title = '${req.body[0]}'`;
    if (req.body.length > 0) {
        for (let i = 1; i < req.body.length; i++) {
            bodyQuery = bodyQuery + ` OR category.title = '${req.body[i]}'`
        }
    } else {
        bodyQuery = `category.title = '${req.body[0]}`
    };
    const preparedQuery = initialQuery + bodyQuery + ";";
    db.all(preparedQuery, (err, rows) => {
        res.send(rows);
        console.log('GET ads requested: ', rows.length, ' ads returned');
    })
}); */

// average category (TODO: add param)
/* app.get("/ads/category/average", (req, res) => {
    db.all(`SELECT AVG(price) AS price FROM ad
            JOIN category ON category.id = ad.category_id
            WHERE category.title = "autre";`, // TODO:requete préparée
        (err, rows: any) => {
            res.send(rows);
            console.log('Average price in', 'autre', 'is', rows[0].price);
        })
}) */

// categories starting with one letter
/* app.get("/ads/letter", (req, res) => {
    const query = db.prepare(
        `SELECT * FROM ad
            JOIN category ON category.id = ad.category_id
            WHERE ad.title LIKE ?;`
    );
    query.all([`%${req.body.letter}%`], (err, rows) => {
        res.send(rows);
        console.log('These ads contain the character', req.body.letter);
    });
}); */

// add an ad
app.post("/ads", (req, res) => {
    for (let i = 0; i < ads.length; i++) {
        if (req.body.title === ads[i].title) {
            return console.log("This product already exist");
        }
    }
    if (req.body.id && req.body.title && req.body.owner && req.body.price && req.body.createdAt) {
        console.log("all parameters present");

        req.body.id = ads[ads.length - 1].id + 1;
        ads.push(req.body);
    } else {
        console.log("we're missing a required parameter");
        console.log(req.body);
    }

    res.send(ads);
})

// delete an ad 
/* app.delete("/ads", (req, res) => {
    ads = ads.filter((ad) => ad.id !== req.body.id);
    res.send("The ad was deleted");
}); */

// delete if more than 40€
/* app.delete("/ads/value", (req, res) => {
    const query = db.prepare("DELETE FROM ad WHERE price >= ?;");
    query.run([req.query.price]);
    console.log("Ads were deleted");
}) */

// update an ad
/* app.put("/ads", (req, res) => {
    ads = ads.map((ad) => {
        if (ad.id !== req.body.id) {
            return ad;
        } else {
            return req.body.newAd;
        }
    });

    res.send(ads);
}) */

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
