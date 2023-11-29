import { NextFunction, Request, Response } from "express";
import { Logger } from "../../../library/Logger";
import Review from "../../../models/Review";
import { ReviewService } from "./../services/review.service";
import { CreateReviewDto } from "../dto/ReviewDto.dto";

const reviewService = new ReviewService(Review);

export class ReviewController {
  static async createReview(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
        const user = (req as any).user;
        const payload: CreateReviewDto = {
          ...body,
          user: user?.id
        };
      const review = await reviewService.createReview(payload);
      return res.status(201).json({
        message: "Review added successfully",
        data: review,
      });
    } catch (error) {
      Logger.error(error);
      next(error);
    }
  }

  static async getReviewById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const review = await reviewService.getReviewById(id);
      return res
        .status(200)
        .json({ message: "Review fetched successfully", data: review });
    } catch (error) {
      Logger.error(error);
      next(error);
    }
  }

  static async getProductReviews(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { productId } = req.params;
      const reviews = await reviewService.getProductReviews(productId);
      return res.status(200).json({
        message: "Product reviews fetched successfully",
        data: reviews,
      });
    } catch (error) {
      Logger.error(error);
      next(error);
    }
  }

  static async deleteReview(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const review = await reviewService.deleteProductReview(id);
      return res
        .status(200)
        .json({ message: "Review deleted successfully", data: review });
    } catch (error) {
      Logger.error(error);
      next(error);
    }
  }
}
