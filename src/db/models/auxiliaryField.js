const AuxiliaryField = (sequelize, DataTypes) => {
  return sequelize.define(
    "auxiliary_fields",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      description: DataTypes.STRING,
      field_id: DataTypes.INTEGER,
      field_description: DataTypes.STRING,
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "auxiliary_fields",
    }
  );
};

module.exports = AuxiliaryField;
