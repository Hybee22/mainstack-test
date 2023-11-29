import Joi from "joi";
import { celebrate, Segments } from "celebrate";

export const categoryValidator = {
  verifyBody: celebrate({
    [Segments.BODY]: Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
    }),
  }),
  verifyCategoryParams: celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().required(),
    }),
  }),
  verifyCategoryParamsAndBody: celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object({
      name: Joi.string().optional(),
      description: Joi.string().optional(),
    }),
  }),
};
