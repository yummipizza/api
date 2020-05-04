import Sequelize from "sequelize";
import { sequelize } from "../";

export const Client = sequelize.define(
  "client",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullName: Sequelize.STRING,
    deliveryAddress: Sequelize.TEXT,
    mobile: Sequelize.STRING,
    email: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    tableName: "client",
  }
);
