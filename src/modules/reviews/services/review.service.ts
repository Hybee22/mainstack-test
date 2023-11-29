import { Model } from "mongoose";
import Review, { IReviewModel } from "../../../models/Review";
import { CreateReviewType } from "../../../types";

export class ReviewService {
  constructor(private reviewRepository: Model<IReviewModel>) {}
  async createReview(payload: CreateReviewType) {
    const review = await this.reviewRepository.create(payload);
    return review;
  }

  async getProductReviews(id: string) {
    const reviews = await this.reviewRepository.find({
      product: id,
    });
    await Review.populate(reviews, {
      path: "user",
      select: "name _id",
    });
    return reviews;
  }

  async deleteProductReview(id: string) {
    const review = await this.reviewRepository.findByIdAndDelete(id);
    return review;
  }

  async getReviewById(id: string) {
    const review = await this.reviewRepository.findById(id);
    return review;
  }
}
