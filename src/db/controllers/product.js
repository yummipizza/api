// @vendors
import * as Joi from "@hapi/joi";
/// @models
import { Models } from "../models";

const validateTypeIdSchema = Joi.object({
  typeId: Joi.number().required(),
});

const validateProductIdSchema = Joi.object({
  id: Joi.number().required(),
});

export const Product = {
  async getByType(typeId) {
    try {
      await validateTypeIdSchema.validateAsync({ typeId });

      return Models.Product.findAll({
        where: {
          type_id: typeId,
        },
      });
    } catch (error) {
      return error;
    }
  },

  async getById(id) {
    try {
      await validateProductIdSchema.validateAsync({ id });

      return Models.Product.findOne({ where: { id } });
    } catch (error) {
      return error;
    }
  },
};
