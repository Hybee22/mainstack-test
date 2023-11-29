import Review from "../../../models/Review";
import { CreateReviewType } from "../../../types";
import { ReviewService } from "./review.service";

describe("ReviewService", () => {
  // create a review with valid payload
  it("should create a review with valid payload", async () => {
    // Arrange
    const payload: CreateReviewType = {
      description: "Test Review",
      user: "Test User",
      product: "Test Product",
    };
    const review = { _id: "1", ...payload };
    const reviewRepositoryMock = {
      create: jest.fn().mockResolvedValue(review),
    };
    const reviewService = new ReviewService(reviewRepositoryMock as any);

    // Act
    const result = await reviewService.createReview(payload);

    // Assert
    expect(result).toEqual(review);
    expect(reviewRepositoryMock.create).toHaveBeenCalledWith(payload);
  });

  // get product reviews with valid product id
  it("should get product reviews with valid product id", async () => {
    // Arrange
    const productId = "1";
    const reviews = [
      { _id: "1", name: "Test Review", user: "Test User", product: productId },
    ];
    const reviewRepositoryMock = {
      find: jest.fn().mockResolvedValue(reviews),
    };

    jest.spyOn(Review, "populate").mockImplementation((data, options) => {
      return data.map((item: any) => {
        return { ...item, user: { name: "categoryName", _id: "id" } };
      });
    });
    const reviewService = new ReviewService(reviewRepositoryMock as any);

    // Act
    const result = await reviewService.getProductReviews(productId);

    // Assert
    expect(result).toEqual(reviews);
    expect(reviewRepositoryMock.find).toHaveBeenCalledWith({
      product: productId,
    });
    expect(Review.populate).toHaveBeenCalledWith(reviews, {
      path: "user",
      select: "name _id",
    });
  });

  // delete a review with valid review id
  it("should delete a review with valid review id", async () => {
    // Arrange
    const reviewId = "1";
    const review = {
      _id: reviewId,
      name: "Test Review",
      user: "Test User",
      product: "Test Product",
    };
    const reviewRepositoryMock = {
      findByIdAndDelete: jest.fn().mockResolvedValue(review),
    };
    const reviewService = new ReviewService(reviewRepositoryMock as any);

    // Act
    const result = await reviewService.deleteProductReview(reviewId);

    // Assert
    expect(result).toEqual(review);
    expect(reviewRepositoryMock.findByIdAndDelete).toHaveBeenCalledWith(
      reviewId
    );
  });

  // get a review by id with valid review id
  it("should get a review by id with valid review id", async () => {
    // Arrange
    const id = "validId";
    const review = {
      _id: id,
      name: "Test Review",
      user: "Test User",
      product: "Test Product",
    };
    const reviewRepositoryMock = {
      findById: jest.fn().mockResolvedValue(review),
    };
    const reviewService = new ReviewService(reviewRepositoryMock as any);

    // Act
    const result = await reviewService.getReviewById(id);

    // Assert
    expect(result).toEqual(review);
    expect(reviewRepositoryMock.findById).toHaveBeenCalledWith(id);
  });
});
