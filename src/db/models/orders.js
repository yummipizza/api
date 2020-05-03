const Orders = (sequelize, DataTypes) => {
  const ordersModel = sequelize.define(
    "orders",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      total: DataTypes.DOUBLE,
      delivery_cost: DataTypes.DOUBLE,
      completed: DataTypes.BOOLEAN,
      paidAt: DataTypes.DATE,
      client_id: DataTypes.INTEGER,
      comments: DataTypes.TEXT,
    },
    {
      freezeTableName: true,
      tableName: "orders",
    }
  );

  ordersModel.associate = (models) => {
    ordersModel.belongsTo(models.Client, {
      foreignKey: "client_id",
      as: "client",
    });
  };

  return ordersModel;
};

module.exports = Orders;
