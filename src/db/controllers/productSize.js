/// @models
import { Models } from "../models";
// @validators
import { validateIdSchema } from "../utilities/validators";

export const ProductSize = {
  async getSizesByProductId(productId) {
    try {
      await validateIdSchema.validateAsync({ id: productId });

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
