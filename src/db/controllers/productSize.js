// @vendors
import * as Joi from "@hapi/joi";
/// @models
import { Models } from "../models";

const validateProductIdSchema = Joi.object({
  productId: Joi.number().required(),
});

export const ProductSize = {
  async getSizesByProductId(productId) {
    try {
      await validateProductIdSchema.validateAsync({ productId });

      return Models.ProductSize.findAll({
        where: { product_id: productId },
        include: [
          {
            model: Models.AuxiliaryField,
            as: "size",
          },
        ],
      });
    } catch (error) {
      return error;
    }
  },
};
