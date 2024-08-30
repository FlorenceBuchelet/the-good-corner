import { FieldResolver, Query, Resolver, Root, Arg, Int, Mutation } from "type-graphql";
import { Ad } from "../entities/Ad";
import DataLoader from "dataloader";
import { Tag } from "../entities/Tag";
import { In } from "typeorm";
import { Category } from "../entities/Category";


const tagsDataLoader = new DataLoader((ids) => {
    return Tag.findBy({
        id: In(ids)
    });
});

// Classe Typescript décorée
@Resolver(Ad) // Définir ce que résoud ce resolver
export class AdResolver {

    @FieldResolver()
    async tags(@Root() ad: Ad): Promise<(Tag | Error)[]> {
        if (ad.tagIds == null || ad.tagIds.length == 0) {
            return [];
        }
        return tagsDataLoader.loadMany(ad.tagIds);
    }

    // remplace la définition de endpoint
    @Query(type => [Ad]) 
    async getAllAds(): Promise<Ad[]> { // la fonction retourne toutes les Ads
        console.log("getAllAds Query called from graphql")
        const ads: Ad[] = await Ad.find({});
        return ads;
    }

    @Mutation(type => Ad)
    async publishAd(
        @Arg("title") title: string,
        @Arg("description", { nullable: true }) description: string,
        @Arg("owner") owner: string,
        @Arg("price", { nullable: true }) price: number,
        @Arg("picture", { nullable: true }) picture: string,
        @Arg("location", { nullable: true }) location: string,
        @Arg("categoryId", { nullable: true }) categoryId: number,
        @Arg("tagsIds", type => [Int], { nullable: true }) tagsIds: number[]
    ): Promise<Ad> {
        const ad = new Ad();
        ad.title = title;
        ad.description = description;
        ad.owner = owner;
        ad.price = price;
        ad.picture = picture;
        ad.location = location;

        // Gestion de la catégorie
        if (categoryId) {
            const category = await Category.findOneBy({ id: categoryId});
            if (category) {
                ad.category = category;
            }
        }

        // Gestion des tags
        if (tagsIds && tagsIds.length > 0) {
            const tags = await Tag.findByIds(tagsIds);
            ad.tags = Promise.resolve(tags);
        }

        await ad.save();

        return ad;
    }


}