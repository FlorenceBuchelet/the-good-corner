import { Arg, Query, Resolver } from "type-graphql";
import { Category } from "../entities/Category";
import { dataSource } from "../dataSource/dataSource";

@Resolver(Category)
export class CategoryResolver {


    @Query(type => [Category])
    async getAllCategories(): Promise<Category[]> {
        const categories: Category[] = await dataSource.manager.find(Category);
        return categories;
    }

    // get category by id
    @Query(type => Category, { nullable: true })
    async getCategoryById(@Arg("id") id: number): Promise<Category | null> {
        const category = await Category.findOneBy({ id });
        return category;
    }

}