import express from "express";
import { ReviewController } from "../controllers/review.controller";
import {
  authenticate,
  authenticateAndisAdmin,
} from "../../../middleware/authorize-user";
import { reviewValidator } from "../validators";

const router = express();

router.post(
  "/",
  authenticate,
  reviewValidator.verifyBody,
  ReviewController.createReview
);
router.get(
  "/:id",
  reviewValidator.verifyReviewIdParams,
  ReviewController.getReviewById
);
router.get(
  "/product/:productId",
  reviewValidator.verifyReviewProductIdParams,
  ReviewController.getProductReviews
);
router.delete(
  "/:id",
  authenticateAndisAdmin,
  reviewValidator.verifyReviewIdParams,
  ReviewController.deleteReview
);

export const ReviewRoutes = router;
