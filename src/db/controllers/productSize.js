/// @models
import { ProductSize as ProductSizeModel, AuxiliaryField } from "../models";
// @validators
import { validateIdSchema } from "../utilities/validators";

export const ProductSize = {
  async getSizesByProductId(productId) {
    try {
      await validateIdSchema.validateAsync({ id: productId });

      return ProductSizeModel.findAll({
        where: { product_id: productId },
        include: [
          {
            model: AuxiliaryField,
            as: "size",
          },
        ],
      });
    } catch (error) {
      return error;
    }
  },
};
