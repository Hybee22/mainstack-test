import Joi from "joi";
import { celebrate, Segments } from "celebrate";

export const reviewValidator = {
  verifyBody: celebrate({
    [Segments.BODY]: Joi.object({
      description: Joi.string().required(),
      product: Joi.string().required(),
    }),
  }),
  verifyReviewIdParams: celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().required(),
    }),
  }),
  verifyReviewProductIdParams: celebrate({
    [Segments.PARAMS]: Joi.object({
      productId: Joi.string().required(),
    }),
  }),
};
