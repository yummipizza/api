// @models
import { AuxiliaryField as AuxiliaryFieldModel } from "../models";
// @validators
import { validateIdSchema } from "../utilities/validators";

export const AuxiliaryField = {
  async getByFieldId(fieldId) {
    try {
      await validateIdSchema.validateAsync({ id: fieldId });

      return AuxiliaryFieldModel.findAll({
        where: {
          field_id: fieldId,
        },
      });
    } catch (error) {
      return error;
    }
  },
};
