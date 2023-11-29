import { NextFunction, Request, Response } from "express";
import { Logger } from "../../../library/Logger";
import Category from "../../../models/Category";
import { CategoryService } from "./../services/categories.service";
import { CreateCategoryDto, UpdateCategoryDto } from "../dto/CategoryDto.dto";

const categoryService = new CategoryService(Category);

export class CategoriesController {
  static async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const payload: CreateCategoryDto = req.body;
      const category = await categoryService.createCategory(payload);
      return res.status(201).json({
        message: "Products category created successfully",
        data: category,
      });
    } catch (error) {
      Logger.error(error);
      next(error);
    }
  }

  static async getCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const category = await categoryService.getCategoryById(id);
      return res
        .status(200)
        .json({ message: "Category fetched successfully", data: category });
    } catch (error) {
      Logger.error(error);
      next(error);
    }
  }

  static async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await categoryService.getCategories();
      return res
        .status(200)
        .json({ message: "Categories fetched successfully", data: categories });
    } catch (error) {
      Logger.error(error);
      next(error);
    }
  }

  static async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const payload: UpdateCategoryDto = req.body;
      const category = await categoryService.updateCategory(id, payload);
      return res
        .status(200)
        .json({ message: "Category updated successfully", data: category });
    } catch (error) {
      Logger.error(error);
      next(error);
    }
  }

  static async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const category = await categoryService.deleteCategory(id);
      return res
        .status(200)
        .json({ message: "Category deleted successfully", data: category });
    } catch (error) {
      Logger.error(error);
      next(error);
    }
  }
}
