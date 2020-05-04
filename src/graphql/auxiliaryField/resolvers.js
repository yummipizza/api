module.exports = {
  Query: {
    getAuxiliaryFieldByFieldId(_, { id }, { AuxiliaryField }) {
      return AuxiliaryField.getById(id);
    },
  },
};
