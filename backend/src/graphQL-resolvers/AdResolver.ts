import { FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Ad } from "../entities/Ad";
import DataLoader from "dataloader";
import { Tag } from "../entities/Tag";
import { In } from "typeorm";

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

    @Query(type => [Ad]) // remplace la définition de endpoint
    async getAllAds(): Promise<Ad[]> { // la fonction retourne toutes les Ads
        console.log("getAllAds Query called from graphql")
        const ads: Ad[] = await Ad.find({});
        return ads;
    }

}