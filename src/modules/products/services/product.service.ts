import { Model } from "mongoose";
import Product, { IProductModel } from "../../../models/Product";
import { CreateProductType, UpdateProductType } from "../../../types";

export class ProductService {
  constructor(private productRepository: Model<IProductModel>) {}
  async createProduct(payload: CreateProductType) {
    const product = await this.productRepository.create(payload);
    return product;
  }

  async getProducts() {
    const products = await this.productRepository.find({});
    await Product.populate(products, {
      path: "category",
    });
    return products;
  } 

  async updateProduct(id: string, data: UpdateProductType) {
    const product = await this.productRepository.findByIdAndUpdate(id, data, {
      new: true,
    });
    return product;
  }

  async deleteProduct(id: string) {
    const product = await this.productRepository.findByIdAndDelete(id);
    return product;
  }

  async getProductById(id: string) {
    const product = await this.productRepository.findById(id);
    return product;
  }

  async getProductsByCategory(category: string) {
    const products = await this.productRepository.find({ category });
    return products;
  }
}
