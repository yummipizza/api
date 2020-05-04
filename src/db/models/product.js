import Sequelize from "sequelize";
import { sequelize } from "../";
import { AuxiliaryField } from "./auxiliaryField";

const productModel = sequelize.define(
  "product",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    type_id: Sequelize.INTEGER,
    image: Sequelize.STRING,
    category_id: Sequelize.INTEGER,
  },
  {
    freezeTableName: true,
    tableName: "product",
  }
);

productModel.belongsTo(AuxiliaryField, {
  foreignKey: "type_id",
  as: "productType",
});

productModel.belongsTo(AuxiliaryField, {
  foreignKey: "category_id",
  as: "category",
});

export const Product = productModel;
