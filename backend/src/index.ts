import "reflect-metadata";
import express from "express";
import cors from "cors";
import { DataSource } from "typeorm";
import { Ad } from "./entities/Ad";
import { Category } from "./entities/Category";
import { Tag } from "./entities/Tag";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// TypeORM setup
// Datasource
export const dataSource = new DataSource({
    type: "sqlite",
    database: `${__dirname}../../database/good_corner.sqlite`,
    entities: [`${__dirname}/entities/*.ts`],
    synchronize: true,
});


// //////////////////////////////////////////////
// Router 

// HOME
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// ADS

// GET all ads (number and content) or per city
app.get("/ads/all", async (req, res) => {
    // all ads
    if (!req.query.city && !req.query.category) {
        const ads: Ad[] = await dataSource.manager.find(Ad);
        res.send(ads);
        console.log(`I have ${ads.length} ads.`);
        // all ads per city
    } else if (req.query.city) {
        const city = req.query.city as string | undefined;
        const ads: Ad[] = await dataSource.manager.find(Ad, {
            where: {
                city
            }
        })
        res.send(ads);
        console.log(`I have ${ads.length} ads for ${city}.`);
    } /* else if (req.query.category) {
        const category = req.query.category as string | undefined;
        const ads: Ad[] = await dataSource.manager.find(Ad, {
            relations: {
                category: true
            },
            where: {
                category
            }
        })
        res.send(ads);
        console.log(`GET ads requested: ${ads.length} ads in ${req.query.category}`);
    } */
})

// category names
app.get("/category/all")


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
/* app.post("/ads", (req, res) => {
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
}) */

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

// Data management services

async function cleanDB() {
    await dataSource.manager.clear(Ad);
    await dataSource.manager.clear(Category);
    await dataSource.manager.clear(Tag);
    await dataSource.query("DELETE FROM sqlite_sequence");
}

async function createAndPersistData(
    title: string,
    description: string,
    author: string,
    price: number,
    createdAt: Date,
    picture: string,
    city: string,
    category: Category,
    ...tags: Tag[]
) {
    const ad = new Ad(title, description, author, price, createdAt, picture, city);
    ad.category = category;
    ad.tags = Promise.resolve(tags);
    await dataSource.manager.save(ad);
}

async function initData() {
    const tag = new Tag("Rouge");
    const tag2 = new Tag("Marron");
    const tag3 = new Tag("Roux");

    const cat = new Category("Ours");
    const cat2 = new Category("Chaton");
    const cat3 = new Category("Suricate");

    await dataSource.manager.save(cat);
    await dataSource.manager.save(cat2);
    await dataSource.manager.save(cat3);

    // Bordeaux
        await createAndPersistData("Annonce Bordeaux 1", "Description de l'annonce Bordeaux 1", "Auteur 1", 1.0, new Date(), "https://placebear.com/200/351.jpg", "Bordeaux", cat3, tag, tag3),
        await createAndPersistData("Annonce Bordeaux 2", "Description de l'annonce Bordeaux 2", "Auteur 2", 15.0, new Date(), "https://placebear.com/200/352.jpg", "Bordeaux", cat, tag),
        await createAndPersistData("Annonce Bordeaux 3", "Description de l'annonce Bordeaux 3", "Auteur 3", 2.0, new Date(), "https://placebear.com/200/353.jpg", "Bordeaux", cat2, tag, tag2),
        await createAndPersistData("Annonce Bordeaux 4", "Description de l'annonce Bordeaux 4", "Auteur 4", 25.0, new Date(), "https://placebear.com/200/354.jpg", "Bordeaux", cat3, tag, tag3),
        await createAndPersistData("Annonce Bordeaux 5", "Description de l'annonce Bordeaux 5", "Auteur 5", 3.0, new Date(), "https://placebear.com/200/355.jpg", "Bordeaux", cat2, tag, tag2),
        await createAndPersistData("Annonce Bordeaux 6", "Description de l'annonce Bordeaux 6", "Auteur 6", 35.0, new Date(), "https://placebear.com/200/356.jpg", "Bordeaux", cat, tag),
        await createAndPersistData("Annonce Bordeaux 7", "Description de l'annonce Bordeaux 7", "Auteur 7", 4.0, new Date(), "https://placebear.com/200/357.jpg", "Bordeaux", cat3, tag, tag3),
        await createAndPersistData("Annonce Bordeaux 8", "Description de l'annonce Bordeaux 8", "Auteur 8", 45.0, new Date(), "https://placebear.com/200/358.jpg", "Bordeaux", cat, tag),
        await createAndPersistData("Annonce Bordeaux 9", "Description de l'annonce Bordeaux 9", "Auteur 9", 5.0, new Date(), "https://placebear.com/200/359.jpg", "Bordeaux", cat2, tag, tag2),
        await createAndPersistData("Annonce Bordeaux 10", "Description de l'annonce Bordeaux 10", "Auteur 10", 55.0, new Date(), "https://placebear.com/200/310.jpg", "Bordeaux", cat3, tag, tag3),
        await createAndPersistData("Annonce Bordeaux 11", "Description de l'annonce Bordeaux 11", "Auteur 11", 6.0, new Date(), "https://placebear.com/200/311.jpg", "Bordeaux", cat2, tag, tag2),
        await createAndPersistData("Annonce Bordeaux 12", "Description de l'annonce Bordeaux 12", "Auteur 12", 65.0, new Date(), "https://placebear.com/200/312.jpg", "Bordeaux", cat, tag),
        await createAndPersistData("Annonce Bordeaux 13", "Description de l'annonce Bordeaux 13", "Auteur 13", 7.0, new Date(), "https://placebear.com/200/313.jpg", "Bordeaux", cat3, tag, tag3),
        await createAndPersistData("Annonce Bordeaux 14", "Description de l'annonce Bordeaux 14", "Auteur 14", 75.0, new Date(), "https://placebear.com/200/314.jpg", "Bordeaux", cat, tag),
        await createAndPersistData("Annonce Bordeaux 15", "Description de l'annonce Bordeaux 15", "Auteur 15", 8.0, new Date(), "https://placebear.com/200/315.jpg", "Bordeaux", cat, tag),
        await createAndPersistData("Annonce Bordeaux 16", "Description de l'annonce Bordeaux 16", "Auteur 16", 85.0, new Date(), "https://placebear.com/200/316.jpg", "Bordeaux", cat3, tag, tag3),
        await createAndPersistData("Annonce Bordeaux 17", "Description de l'annonce Bordeaux 17", "Auteur 17", 9.0, new Date(), "https://placebear.com/200/317.jpg", "Bordeaux", cat, tag),
        await createAndPersistData("Annonce Bordeaux 18", "Description de l'annonce Bordeaux 18", "Auteur 18", 95.0, new Date(), "https://placebear.com/200/318.jpg", "Bordeaux", cat, tag),
        await createAndPersistData("Annonce Bordeaux 19", "Description de l'annonce Bordeaux 19", "Auteur 19", 10.0, new Date(), "https://placebear.com/200/319.jpg", "Bordeaux", cat3, tag, tag3),
        await createAndPersistData("Annonce Bordeaux 20", "Description de l'annonce Bordeaux 20", "Auteur 20", 105.0, new Date(), "https://placebear.com/200/320.jpg", "Bordeaux", cat3, tag, tag3),
        // Paris
        await createAndPersistData("Annonce Paris 1", "Description de l'annonce Paris 1", "Auteur 21", 11.0, new Date(), "https://placebear.com/200/321.jpg", "Paris", cat, tag),
        await createAndPersistData("Annonce Paris 2", "Description de l'annonce Paris 2", "Auteur 22", 115.0, new Date(), "https://placebear.com/200/322.jpg", "Paris", cat2, tag, tag2),
        await createAndPersistData("Annonce Paris 3", "Description de l'annonce Paris 3", "Auteur 23", 12.0, new Date(), "https://placebear.com/200/323.jpg", "Paris", cat, tag),
        await createAndPersistData("Annonce Paris 4", "Description de l'annonce Paris 4", "Auteur 24", 125.0, new Date(), "https://placebear.com/200/324.jpg", "Paris", cat3, tag, tag3),
        await createAndPersistData("Annonce Paris 5", "Description de l'annonce Paris 5", "Auteur 25", 13.0, new Date(), "https://placebear.com/200/325.jpg", "Paris", cat2, tag, tag2),
        await createAndPersistData("Annonce Paris 6", "Description de l'annonce Paris 6", "Auteur 26", 135.0, new Date(), "https://placebear.com/200/326.jpg", "Paris", cat3, tag, tag3),
        await createAndPersistData("Annonce Paris 7", "Description de l'annonce Paris 7", "Auteur 27", 14.0, new Date(), "https://placebear.com/200/327.jpg", "Paris", cat, tag),
        await createAndPersistData("Annonce Paris 8", "Description de l'annonce Paris 8", "Auteur 28", 145.0, new Date(), "https://placebear.com/200/328.jpg", "Paris", cat2, tag, tag2),
        await createAndPersistData("Annonce Paris 9", "Description de l'annonce Paris 9", "Auteur 29", 15.0, new Date(), "https://placebear.com/200/329.jpg", "Paris", cat, tag),
        await createAndPersistData("Annonce Paris 10", "Description de l'annonce Paris 10", "Auteur 30", 155.0, new Date(), "https://placebear.com/200/330.jpg", "Paris", cat, tag),
        await createAndPersistData("Annonce Paris 11", "Description de l'annonce Paris 11", "Auteur 31", 16.0, new Date(), "https://placebear.com/200/331.jpg", "Paris", cat2, tag, tag2),
        await createAndPersistData("Annonce Paris 12", "Description de l'annonce Paris 12", "Auteur 32", 165.0, new Date(), "https://placebear.com/200/332.jpg", "Paris", cat, tag),
        await createAndPersistData("Annonce Paris 13", "Description de l'annonce Paris 13", "Auteur 33", 17.0, new Date(), "https://placebear.com/200/333.jpg", "Paris", cat, tag),
        await createAndPersistData("Annonce Paris 14", "Description de l'annonce Paris 14", "Auteur 34", 175.0, new Date(), "https://placebear.com/200/334.jpg", "Paris", cat2, tag, tag2),
        await createAndPersistData("Annonce Paris 15", "Description de l'annonce Paris 15", "Auteur 35", 18.0, new Date(), "https://placebear.com/200/335.jpg", "Paris", cat3, tag, tag3),
        await createAndPersistData("Annonce Paris 16", "Description de l'annonce Paris 16", "Auteur 36", 185.0, new Date(), "https://placebear.com/200/336.jpg", "Paris", cat3, tag, tag3),
        await createAndPersistData("Annonce Paris 17", "Description de l'annonce Paris 17", "Auteur 37", 19.0, new Date(), "https://placebear.com/200/337.jpg", "Paris", cat3, tag, tag3),
        await createAndPersistData("Annonce Paris 18", "Description de l'annonce Paris 18", "Auteur 38", 195.0, new Date(), "https://placebear.com/200/338.jpg", "Paris", cat, tag),
        await createAndPersistData("Annonce Paris 19", "Description de l'annonce Paris 19", "Auteur 39", 20.0, new Date(), "https://placebear.com/200/339.jpg", "Paris", cat, tag),
        await createAndPersistData("Annonce Paris 20", "Description de l'annonce Paris 20", "Auteur 40", 205.0, new Date(), "https://placebear.com/200/340.jpg", "Paris", cat3, tag, tag3),
        // Lyon
        await createAndPersistData("Annonce Lyon 1", "Description de l'annonce Lyon 1", "Auteur 41", 21.0, new Date(), "https://placebear.com/200/341.jpg", "Lyon", cat, tag),
        await createAndPersistData("Annonce Lyon 2", "Description de l'annonce Lyon 2", "Auteur 42", 215.0, new Date(), "https://placebear.com/200/342.jpg", "Lyon", cat2, tag, tag2),
        await createAndPersistData("Annonce Lyon 3", "Description de l'annonce Lyon 3", "Auteur 43", 22.0, new Date(), "https://placebear.com/200/343.jpg", "Lyon", cat2, tag, tag2),
        await createAndPersistData("Annonce Lyon 4", "Description de l'annonce Lyon 4", "Auteur 44", 225.0, new Date(), "https://placebear.com/200/344.jpg", "Lyon", cat3, tag, tag3),
        await createAndPersistData("Annonce Lyon 5", "Description de l'annonce Lyon 5", "Auteur 45", 23.0, new Date(), "https://placebear.com/200/345.jpg", "Lyon", cat, tag),
        await createAndPersistData("Annonce Lyon 6", "Description de l'annonce Lyon 6", "Auteur 46", 235.0, new Date(), "https://placebear.com/200/346.jpg", "Lyon", cat2, tag, tag2),
        await createAndPersistData("Annonce Lyon 7", "Description de l'annonce Lyon 7", "Auteur 47", 24.0, new Date(), "https://placebear.com/200/347.jpg", "Lyon", cat, tag),
        await createAndPersistData("Annonce Lyon 8", "Description de l'annonce Lyon 8", "Auteur 48", 245.0, new Date(), "https://placebear.com/200/348.jpg", "Lyon", cat3, tag, tag3),
        await createAndPersistData("Annonce Lyon 9", "Description de l'annonce Lyon 9", "Auteur 49", 25.0, new Date(), "https://placebear.com/200/349.jpg", "Lyon", cat2, tag, tag2),
        await createAndPersistData("Annonce Lyon 10", "Description de l'annonce Lyon 10", "Auteur 50", 255.0, new Date(), "https://placebear.com/200/350.jpg", "Lyon", cat, tag),
        await createAndPersistData("Annonce Lyon 11", "Description de l'annonce Lyon 11", "Auteur 51", 26.0, new Date(), "https://placebear.com/200/351.jpg", "Lyon", cat, tag),
        await createAndPersistData("Annonce Lyon 12", "Description de l'annonce Lyon 12", "Auteur 52", 265.0, new Date(), "https://placebear.com/200/352.jpg", "Lyon", cat2, tag, tag2),
        await createAndPersistData("Annonce Lyon 13", "Description de l'annonce Lyon 13", "Auteur 53", 27.0, new Date(), "https://placebear.com/200/353.jpg", "Lyon", cat3, tag, tag3),
        await createAndPersistData("Annonce Lyon 14", "Description de l'annonce Lyon 14", "Auteur 54", 275.0, new Date(), "https://placebear.com/200/354.jpg", "Lyon", cat, tag),
        await createAndPersistData("Annonce Lyon 15", "Description de l'annonce Lyon 15", "Auteur 55", 28.0, new Date(), "https://placebear.com/200/355.jpg", "Lyon", cat2, tag, tag2),
        await createAndPersistData("Annonce Lyon 16", "Description de l'annonce Lyon 16", "Auteur 56", 285.0, new Date(), "https://placebear.com/200/356.jpg", "Lyon", cat, tag),
        await createAndPersistData("Annonce Lyon 17", "Description de l'annonce Lyon 17", "Auteur 57", 29.0, new Date(), "https://placebear.com/200/357.jpg", "Lyon", cat3, tag, tag3),
        await createAndPersistData("Annonce Lyon 18", "Description de l'annonce Lyon 18", "Auteur 58", 295.0, new Date(), "https://placebear.com/200/358.jpg", "Lyon", cat2, tag, tag2),
        await createAndPersistData("Annonce Lyon 19", "Description de l'annonce Lyon 19", "Auteur 59", 30.0, new Date(), "https://placebear.com/200/359.jpg", "Lyon", cat3, tag, tag3),
        await createAndPersistData("Annonce Lyon 20", "Description de l'annonce Lyon 20", "Auteur 60", 305.0, new Date(), "https://placebear.com/200/360.jpg", "Lyon", cat, tag);
}

app.listen(port, async () => {
    await dataSource.initialize();
    await cleanDB();
    await initData();
    console.log(`Example app listening on port ${port}`);
});
