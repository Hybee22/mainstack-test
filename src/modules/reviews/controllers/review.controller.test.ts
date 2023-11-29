import Review from "../../../models/Review";
import { ReviewController } from "./review.controller";
import { ReviewService } from "../services/review.service";

const reviewService = new ReviewService(Review);

jest.mock("../services/review.service");

describe("ReviewController", () => {
  // createReview method successfully creates a new review and returns a 201 status code with the review data
  it("should create a new review and return a 201 status code with the review data", async () => {
    const req = {
      body: {
        description: "Test review",
        user: "Test user",
        product: "Test product",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    //   @ts-ignore
    await ReviewController.createReview(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled()
  });

  // getReviewById method successfully retrieves a review by its ID and returns a 200 status code with the review data
  it("should retrieve a review by its ID and return a 200 status code with the review data", async () => {
    const req = {
      params: {
        id: "testId",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    //   @ts-ignore
    await ReviewController.getReviewById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled()
  });

  // getProductReviews method successfully retrieves all reviews for a given product ID and returns a 200 status code with the review data
  it("should retrieve all reviews for a given product ID and return a 200 status code with the review data", async () => {
    const req = {
      params: {
        productId: "testProductId",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    //   @ts-ignore
    await ReviewController.getProductReviews(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled()
  });

  // deleteReview method successfully deletes a review by its ID and returns a 200 status code with the deleted review data
  it("should delete a review by its ID and return a 200 status code with the deleted review data", async () => {
    // Mocked request parameters
    const req = {
      params: {
        id: "testId",
      },
    };

    // Mocked response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocked next function
    const next = jest.fn();

    // Mocked reviewService.deleteProductReview method
    reviewService.deleteProductReview = jest.fn().mockResolvedValueOnce({
      id: "testId",
      description: "Test review",
      user: "Test user",
      product: "Test product",
    });
    //   @ts-ignore
    // Call the deleteReview method
    await ReviewController.deleteReview(req, res, next);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled()
  });
});
