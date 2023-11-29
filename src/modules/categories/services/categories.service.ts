import { Model } from "mongoose";
import { ICategoryModel } from "../../../models/Category";
import { AppError } from "../../../helpers";
import { CreateCategoryType } from "../../../types";
import { ProductService } from "../../products/services/product.service";
import Product from "../../../models/Product";

const productService = new ProductService(Product)

export class CategoryService {
  constructor(
    private categoryRepository: Model<ICategoryModel>,
  ) {}
  async createCategory({ name, description }: CreateCategoryType) {
    const category = await this.categoryRepository.create({
      name,
      description,
    });
    return category;
  }

  async getCategories() {
    const categories = await this.categoryRepository.find({});
    return categories;
  }

  async updateCategory(id: string, data: any) {
    const category = await this.categoryRepository.findByIdAndUpdate(id, data, {
      new: true,
    });
    return category;
  }

  async deleteCategory(id: string) {
    const products = await productService.getProductsByCategory(id);

    if (products?.length > 0) {
      throw new AppError(
        403,
        "Forbidden! Products has been assigned to this category."
      );
    }

    const category = await this.categoryRepository.findByIdAndDelete(id);
    return category;
  }

  async getCategoryById(id: string) {
    const category = await this.categoryRepository.findById(id);
    return category;
  }
}
