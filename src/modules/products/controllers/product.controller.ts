import { NextFunction, Request, Response } from "express";
import { Logger } from "../../../library/Logger";
import Product from "../../../models/Product";
import { ProductService } from "./../services/product.service";
import { CreateProductDto, UpdateProductDto } from "../dto/ProductDto.dto";

const productService = new ProductService(Product);

export class ProductController {
  static async createProduct(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const payload: CreateProductDto = req.body;
      const product = await productService.createProduct(payload);
      return res.status(201).json({
        message: "Product created successfully",
        data: product,
      });
    } catch (error) {
      Logger.error(error);
      next(error);
    }
  }

  static async getProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id);
      return res
        .status(200)
        .json({ message: "Product fetched successfully", data: product });
    } catch (error) {
      Logger.error(error);
      next(error);
    }
  }

  static async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await productService.getProducts();
      return res
        .status(200)
        .json({ message: "Products fetched successfully", data: products });
    } catch (error) {
      Logger.error(error);
      next(error);
    }
  }

  static async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const payload: UpdateProductDto = req.body;
      const product = await productService.updateProduct(id, payload);
      return res
        .status(200)
        .json({ message: "Product updated successfully", data: product });
    } catch (error) {
      Logger.error(error);
      next(error);
    }
  }

  static async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await productService.deleteProduct(id);
      return res
        .status(200)
        .json({ message: "Product deleted successfully", data: product });
    } catch (error) {
      Logger.error(error);
      next(error);
    }
  }
}
