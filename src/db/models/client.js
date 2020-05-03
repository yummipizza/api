const Client = (sequelize, DataTypes) => {
  return sequelize.define(
    "client",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fullName: DataTypes.STRING,
      deliveryAddress: DataTypes.TEXT,
      mobile: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      freezeTableName: true,
      tableName: "client",
    }
  );
};

module.exports = Client;
