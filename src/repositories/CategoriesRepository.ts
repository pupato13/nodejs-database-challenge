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
}

export default CategoriesRepository;
