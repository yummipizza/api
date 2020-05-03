const OrderDetail = (sequelize, DataTypes) => {
  const orderModel = sequelize.define(
    "order_detail",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      order_id: DataTypes.INTEGER,
      product_size_id: DataTypes.INTEGER,
      quantity: DataTypes.DOUBLE,
    },
    {
      freezeTableName: true,
      tableName: "order_detail",
    }
  );

  orderModel.associate = (models) => {
    orderModel.belongsTo(models.Orders, {
      foreignKey: "order_id",
      as: "order",
    });

    orderModel.belongsTo(models.ProductSize, {
      foreignKey: "product_size_id",
      as: "productSize",
    });
  };

  return orderModel;
};

module.exports = OrderDetail;
