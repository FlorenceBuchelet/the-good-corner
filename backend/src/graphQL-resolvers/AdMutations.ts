import { Arg, Int, Mutation, Resolver } from "type-graphql";
import { Ad } from "../entities/Ad";
import { Category } from "../entities/Category";
import { Tag } from "../entities/Tag";


// AdInput : soit il est créé en dehors, soit dans la mutation. En dehors permettra d'utiliser codegen.

@Resolver(Ad)
export class AdMutations {
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
            const category = await Category.findOne(categoryId);
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