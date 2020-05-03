// @models
import { Models } from "../models";
// @validators
import { validateIdSchema } from "../utilities/validators";

export const AuxiliaryField = {
  async getById(fieldId) {
    try {
      await validateIdSchema.validateAsync({ id: fieldId });

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
