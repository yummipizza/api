const Product = (sequelize, DataTypes) => {
  const productModel = sequelize.define(
    "product",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      type_id: DataTypes.INTEGER,
      image: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
    },
    {
      freezeTableName: true,
      tableName: "product",
    }
  );

  productModel.associate = (models) => {
    productModel.belongsTo(models.AuxiliaryField, {
      foreignKey: "type_id",
      as: "productType",
    });

    productModel.belongsTo(models.AuxiliaryField, {
      foreignKey: "category_id",
      as: "category",
    });
  };

  return productModel;
};

module.exports = Product;
