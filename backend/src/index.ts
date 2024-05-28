import express from "express";
import fs from 'node:fs';

const app = express();
const port = 3000;

app.use(express.json());

let ads = [
    {
        id: 1,
        title: "Bike to sell",
        description:
            "My bike is blue, working fine. I'm selling it because I've got a new one",
        owner: "bike.seller@gmail.com",
        price: 100,
        picture:
            "https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000",
        location: "Paris",
        createdAt: "2023-09-05T10:13:14.755Z",
    },
    {
        id: 2,
        title: "Car to sell",
        description:
            "My car is blue, working fine. I'm selling it because I've got a new one",
        owner: "car.seller@gmail.com",
        price: 10000,
        picture:
            "https://www.automobile-magazine.fr/asset/cms/34973/config/28294/apres-plusieurs-prototypes-la-bollore-bluecar-a-fini-par-devoiler-sa-version-definitive.jpg",
        location: "Paris",
        createdAt: "2023-10-05T10:14:15.922Z",
    },
];

// HOME

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// ADS

app.get("/ads", (req, res) => {
    console.log('GET ads requested: ', ads.length, ' ads returned');

    res.send(ads);
});

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

app.delete("/ads", (req, res) => {
    ads = ads.filter((ad) => ad.id !== req.body.id);
    res.send("The ad was deleted");
});

app.put("/ads", (req, res) => {
    ads = ads.map((ad) => {
        if (ad.id !== req.body.id) {
            return ad;
        } else {
            return req.body.newAd;
        }
    });

    res.send(ads);
})

// MOVIES

const movies: string = fs.readFileSync(`${__dirname}/movies.csv`, { encoding: 'utf-8' });
const moviesLines: string[] = movies.split('\n');
const allMovies: any = [];
moviesLines.forEach((movie) => {
    const singleMovie: string[] = movie.split(";")
    allMovies.push(singleMovie);
    console.log(singleMovie);
    
})

app.get('/movies/count', (req, res) => {
    // retourne le nombre de films dans le fichier
    console.log(allMovies);
    
    console.log(`There are ${moviesLines.length - 1} movies in our list.`);
});

app.get('/movies/totalBudget', (req, res) => {
    // budget nécessaire pour voir tous les films

    let budget: number = 0;
    for (let i = 1; i < allMovies.length; i++) {
        budget = budget + parseInt(allMovies[i][3]);
    }
    console.log(`You need ${budget} dollarz to see all this`);
});

app.get('/movies', (req, res) => {
    let response: string[] = [];
    // si requestedTime return les films qui ont une séance à cette heure
    if (req.query.minYear) {
        for (let i = 1; i < allMovies.length; i++) {
            if (allMovies[i][2] > req.query.minYear) {
                response.push(allMovies[i]);
            }
        }
    } else if (req.query.requestedTime) {
        for (let i = 1; i < allMovies.length; i++) {
            if (allMovies[i][4].includes(req.query.requestedTime)) {
                response.push(allMovies[i]);
            }
        }
    }
    console.log("Here's your list: ", response);
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
