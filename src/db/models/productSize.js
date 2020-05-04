import Sequelize from "sequelize";
import { sequelize } from "../";
import { AuxiliaryField } from "./auxiliaryField";

const productSizeModel = sequelize.define(
  "product_size",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    product_id: Sequelize.INTEGER,
    size_id: Sequelize.INTEGER,
    price: Sequelize.DOUBLE,
    description: Sequelize.STRING,
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "product_size",
  }
);

productSizeModel.belongsTo(AuxiliaryField, {
  foreignKey: "product_id",
  as: "productId",
});

productSizeModel.belongsTo(AuxiliaryField, {
  foreignKey: "size_id",
  as: "size",
});
export const ProductSize = productSizeModel;
