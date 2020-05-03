const ProductSize = (sequelize, DataTypes) => {
  const productSizeModel = sequelize.define(
    "product_size",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      product_id: DataTypes.INTEGER,
      size_id: DataTypes.INTEGER,
      price: DataTypes.DOUBLE,
      description: DataTypes.STRING,
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "product_size",
    }
  );

  productSizeModel.associate = (models) => {
    productSizeModel.belongsTo(models.AuxiliaryField, {
      foreignKey: "product_id",
      as: "productId",
    });

    productSizeModel.belongsTo(models.AuxiliaryField, {
      foreignKey: "size_id",
      as: "size",
    });
  };

  return productSizeModel;
};

module.exports = ProductSize;
