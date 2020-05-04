// @models
import { Product as ProductModel } from "../models";
// @validators
import { validateIdSchema } from "../utilities/validators";

export const Product = {
  async getByType(typeId) {
    try {
      await validateIdSchema.validateAsync({ id: typeId });

      return ProductModel.findAll({
        where: {
          type_id: typeId,
        },
      });
    } catch (error) {
      return error;
    }
  },

  async getById(productId) {
    try {
      await validateIdSchema.validateAsync({ id: productId });

      return ProductModel.findByPk(productId);
    } catch (error) {
      return error;
    }
  },
};
