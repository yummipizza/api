// @models
import { Models } from "../models";
// @validators
import { validateIdSchema } from "../utilities/validators";

export const Product = {
  async getByType(typeId) {
    try {
      await validateIdSchema.validateAsync({ id: typeId });

      return Models.Product.findAll({
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

      return Models.Product.findByPk(productId);
    } catch (error) {
      return error;
    }
  },
};
