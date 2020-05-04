module.exports = {
  AuxiliaryField: {
    fieldId: ({ field_id }) => field_id,
    fieldDescription: ({ field_description }) => field_description,
  },
  Query: {
    getAuxiliaryFieldByFieldId(_, { id }, { AuxiliaryField }) {
      return AuxiliaryField.getByFieldId(id);
    },
  },
};
