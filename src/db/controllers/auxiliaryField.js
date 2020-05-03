// @vendors
import * as Joi from "@hapi/joi";
/// @models
import { Models } from "../models";

const validateFieldIdSchema = Joi.object({
  fieldId: Joi.number().required(),
});

export const AuxiliaryField = {
  async getByFieldId(fieldId) {
    try {
      await validateFieldIdSchema.validateAsync({ fieldId });

      return Models.AuxiliaryField.findAll({
        where: {
          field_id: fieldId,
        },
      });
    } catch (error) {
      return error;
    }
  },
};
