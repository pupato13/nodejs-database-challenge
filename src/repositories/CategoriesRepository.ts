import { EntityRepository, Repository } from "typeorm";

import Category from "../models/Category";

@EntityRepository(Category)
class CategoriesRepository extends Repository<Category> {
    public async getCategoryByTitle(title: string): Promise<Category | null> {
        const category = await this.findOne({
            where: { title },
        });

        return category || null;
    }

    public async getAll(): Promise<Category[] | null> {
        const categories = await this.find();

        return categories || null;
    }
}

export default CategoriesRepository;
