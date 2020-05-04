module.exports = {
  AuxiliaryField: {
    fieldId: ({ field_id }) => field_id,
    fieldDescription: ({ field_description }) => field_description,
  },
  Query: {
    getAuxiliaryFieldByFieldTypes(_, { fieldType }, { AuxiliaryField }) {
      return AuxiliaryField.getByFieldId(fieldType);
    },
  },
  FieldTypes: {
    CATEGORIES: 1,
    PIZZA_TYPES: 2,
    PRODUCT_SIZES: 3,
    DRINK_TYPES: 4,
  },
};
