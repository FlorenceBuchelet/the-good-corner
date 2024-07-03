import { Query, Resolver } from "type-graphql";
import { Category } from "../entities/Category";
import { dataSource } from "../dataSource/dataSource";

@Resolver(Category)
export class CategoriesResolver {


    @Query(type => [Category])
    async getAllCategories(): Promise<Category[]> {
        console.log("getAllAds Query called from graphql")
        const categories: Category[] = await dataSource.manager.find(Category);
        return categories;
    }

}