// @vendors
import * as Joi from "@hapi/joi";

export const validateIdSchema = Joi.object({
  id: Joi.number().required(),
});

export const validateEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const validateCreateOrderSchema = Joi.object({
  deliveryCost: Joi.number(),
  completed: Joi.boolean(),
  client: Joi.object()
    .keys({
      fullName: Joi.string().required(),
      deliveryAddress: Joi.string().required(),
      mobile: Joi.string().required(),
      email: Joi.string().email().required(),
    })
    .required(),
  detail: Joi.array()
    .items(
      Joi.object().keys({
        product: Joi.number().required(),
        size: Joi.number().required(),
        quantity: Joi.number().required(),
        price: Joi.number().required(),
      })
    )
    .required(),
});
