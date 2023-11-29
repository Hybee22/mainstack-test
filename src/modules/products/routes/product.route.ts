import express from "express";
import { ProductController } from "../controllers/product.controller";
import { authenticateAndisAdmin } from "../../../middleware/authorize-user";
import { productValidator } from "../validators";

const router = express();

router.post(
  "/",
  authenticateAndisAdmin,
  productValidator.verifyBody,
  ProductController.createProduct
);
router.get("/", ProductController.getProducts);
router.get(
  "/:id",
  productValidator.verifyProductParams,
  ProductController.getProduct
);
router.patch(
  "/:id",
  authenticateAndisAdmin,
  productValidator.verifyProductParamsAndBody,
  ProductController.updateProduct
);
router.delete(
  "/:id",
  authenticateAndisAdmin,
  productValidator.verifyProductParams,
  ProductController.deleteProduct
);

export const ProductRoutes = router;
