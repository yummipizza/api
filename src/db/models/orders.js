import Sequelize from "sequelize";
import { sequelize } from "../";
import { Client } from "./client";

const ordersModel = sequelize.define(
  "orders",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    total: Sequelize.DOUBLE,
    delivery_cost: Sequelize.DOUBLE,
    completed: Sequelize.BOOLEAN,
    paidAt: Sequelize.DATE,
    client_id: Sequelize.INTEGER,
    comments: Sequelize.TEXT,
  },
  {
    freezeTableName: true,
    tableName: "orders",
  }
);

ordersModel.belongsTo(Client, {
  foreignKey: "client_id",
  as: "client",
});

export const Orders = ordersModel;
