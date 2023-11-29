import Joi from "joi";
import { celebrate, Segments } from "celebrate";

export const productValidator = {
  verifyBody: celebrate({
    [Segments.BODY]: Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      category: Joi.string().required(),
    }),
  }),
  verifyProductParams: celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().required(),
    }),
  }),
  verifyProductParamsAndBody: celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object({
      name: Joi.string().optional(),
      description: Joi.string().optional(),
      price: Joi.number().optional(),
      category: Joi.string().optional(),
    }),
  }),
};
