import express from "express";
import { CategoriesController } from "../controllers/categories.controller";
import { authenticateAndisAdmin } from "../../../middleware/authorize-user";
import { categoryValidator } from "../validators";

const router = express();

router.post(
  "/",
  authenticateAndisAdmin,
  categoryValidator.verifyBody,
  CategoriesController.createCategory
);
router.get("/", authenticateAndisAdmin, CategoriesController.getCategories);
router.get(
  "/:id",
  authenticateAndisAdmin,
  categoryValidator.verifyCategoryParams,
  CategoriesController.getCategory
);
router.patch(
  "/:id",
  authenticateAndisAdmin,
  categoryValidator.verifyCategoryParamsAndBody,
  CategoriesController.updateCategory
);
router.delete(
  "/:id",
  authenticateAndisAdmin,
  categoryValidator.verifyCategoryParams,
  CategoriesController.deleteCategory
);

export const CategoryRoutes = router;
