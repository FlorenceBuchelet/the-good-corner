import { FieldResolver, Query, Resolver, Root, Arg, Int, Mutation, Authorized } from "type-graphql";
import { Ad } from "../entities/Ad";
import DataLoader from "dataloader";
import { Tag } from "../entities/Tag";
import { In } from "typeorm";
import { Category } from "../entities/Category";

// TODO: Comprendre comment ça marche v
const tagsDataLoader = new DataLoader((ids) => {
    return Tag.findBy({
        id: In(ids)
    });
});

@Resolver(Ad)
export class AdResolver {

    @FieldResolver()
    async tags(@Root() ad: Ad): Promise<(Tag | Error)[]> {
        if (ad.tagIds == null || ad.tagIds.length == 0) {
            return [];
        }
        return tagsDataLoader.loadMany(ad.tagIds);
    }

    @Authorized()
    @Query(type => [Ad])
    async getAllAds(): Promise<Ad[]> {
        const ads: Ad[] = await Ad.find({});
        return ads;
    }

    @Query(_ => Ad, { nullable: true })
    async getAdById(@Arg("id") id: number): Promise<Ad | null> {
        const ad: Ad | null = await Ad.findOneBy({ id });
        return ad;
    }

    @Mutation(type => Ad)
    async publishAd(
        @Arg("title") title: string,
        @Arg("description", { nullable: true }) description: string,
        @Arg("owner") owner: string,
        @Arg("stars", { nullable: true }) stars: number,
        @Arg("picture", { nullable: true }) picture: string,
        @Arg("location", { nullable: true }) location: string,
        @Arg("categoryId", { nullable: true }) categoryId: number,
        @Arg("tagsIds", type => [Int], { nullable: true }) tagsIds: number[]
    ): Promise<Ad> {
        const ad = new Ad();
        ad.title = title;
        ad.description = description;
        ad.owner = owner;
        ad.stars = stars;
        ad.picture = picture;
        ad.location = location;

        // Gestion de la catégorie
        if (categoryId) {
            const category = await Category.findOneBy({ id: categoryId });
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

    // Incrémenter le total d'étoiles d'une ad
    @Mutation(_ => Int)
    async addStarsToAd(
        @Arg('stars') stars: number,
        @Arg('adId') adId: number,
    ): Promise<Number | undefined> {
        const ad: Ad | null = await Ad.findOneBy({ id: adId });
        if (!ad) {
            throw new Error('No user found')
        }
        if (ad.stars) {
            ad.stars += stars;
            await ad.save();
        }
        return ad.stars;
    }

}