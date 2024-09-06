import { Column, DataSource, Entity, EntityManager, Like, PrimaryGeneratedColumn } from "typeorm";
import { Ad } from "./entities/Ad";
import { Category } from "./entities/Category";
import { Tag } from "./entities/Tag";
import { dataSource } from "./dataSource/dataSource";
import { app } from "./startExpress";

// //////////////////////////////////////////////
// Router 

// HOME
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// ADS

// GET all ads (number and content) or per city
app.get("/ads", async (req, res) => {
    // all ads per city
    if (req.query.city) {
        console.log("city queried", req.query.city);

        const city = req.query.city as string | undefined;
        const ads: Ad[] = await dataSource.manager.find(Ad, {
            where: {
                city
            }
        })
        res.send(ads);
        console.log(`I have ${ads.length} ads for ${city}.`);
        // all ads per category
    } else if (req.query.category) {
        console.log("category queried", req.query.category);

        let category: number | undefined;
        if (typeof req.query.category === 'string') {
            category = parseInt(req.query.category, 10);
        }
        const ads: Ad[] = await dataSource.manager.find(Ad, {
            relations: {
                category: true,
            },
            where: {
                category: {
                    id: category
                }
            }
        })
        res.send(ads);
        console.log(`GET ads requested: ${ads.length} ads in ${req.query.category}`);
        // All ads
    } else {
        const ads: Ad[] = await dataSource.manager.find(Ad);
        res.send(ads);
        console.log(`I have ${ads.length} ads.`);
    }
})

// All categories
app.get("/categories", async (req, res) => {
    const categories: Category[] = await dataSource.manager.find(Category);
    res.send(categories);
    console.log(`There are ${categories.length} categories`);

})

// GET one ad
app.get("/ads/:id", async (req, res) => {
    const id: number = parseInt(req.params.id);
    const ad: Ad | null = await dataSource.manager.findOne(Ad, {
        where: {
            id: id
        }
    });
    res.send(ad);
    console.log("is this your ad?", ad);
})

// average category (TODO: add param)
/* app.get("/ads/category/average", (req, res) => {
    db.all(`SELECT AVG(stars) AS stars FROM ad
            JOIN category ON category.id = ad.category_id
            WHERE category.title = "autre";`, // TODO:requete préparée
        (err, rows: any) => {
            res.send(rows);
            console.log('Average stars in', 'autre', 'is', rows[0].stars);
        })
}) */

// Autocompletion search
app.get("/search", async (req, res) => {
    // i get the letter(s) from front
    const prompt = req.query.prompt as string | undefined;
    console.log("PROMPT", prompt);

    // I filter the answers
    const ads: Ad[] | null = await dataSource.manager.find(Ad, {
        where: {
            title: Like(`%${prompt}%`)
        }
    })
    // I give back a new array of ads
    res.send(ads);
    console.log("here are your ads, ", ads)
})

// add an ad
// TODO: vérifier si tous les champs obligatoires sont corrects
app.post("/ads", async (req, res) => {
    const nAd = req.body;
    console.log("nad", nAd);

    try {
        const ad = new Ad(nAd.title, nAd.description, nAd.author, nAd.stars, nAd.createdAt, nAd.picture, nAd.city);
        ad.category = nAd.category;
        console.log("ad", ad);
        await dataSource.manager.save(ad);
        res.status(201).send("You did it!")

    } catch (err) {
        console.error('create ad failed', err);
        res.status(500).send('unexpected error')
    }
})

// delete an ad 
app.delete("/ads/:id", async (req, res) => {
    const id: number = parseInt(req.params.id);
    const ad: Ad | null = await dataSource.manager.findOne(Ad, {
        where: {
            id: id
        }
    });
    await dataSource.manager.remove(ad);
    res.status(200).send("you did it again!");
})

// update an ad
app.put("/ads/:id/star", async (req, res) => {
    const id: number = parseInt(req.params.id);
    const ad: Ad | null = await dataSource.manager.findOne(Ad, {
        where: {
            id: id
        }
    });
    if (ad && ad.stars) {
        ad.stars! ++;
    }
    await dataSource.manager.save(ad);
    res.status(200).send(ad);

})
