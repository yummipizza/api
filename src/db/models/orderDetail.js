import Sequelize from "sequelize";
import { sequelize } from "../";
import { Orders } from "./orders";
import { Product } from "./product";
import { ProductSize } from "./productSize";

const orderDetailModel = sequelize.define(
  "order_detail",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: Sequelize.INTEGER,
    product_id: Sequelize.INTEGER,
    product_size_id: Sequelize.INTEGER,
    quantity: Sequelize.DOUBLE,
  },
  {
    freezeTableName: true,
    tableName: "order_detail",
  }
);

orderDetailModel.belongsTo(Orders, {
  foreignKey: "order_id",
  as: "order",
});

orderDetailModel.belongsTo(Product, {
  foreignKey: "product_id",
  as: "product",
});

orderDetailModel.belongsTo(ProductSize, {
  foreignKey: "product_size_id",
  as: "productSize",
});

export const OrderDetail = orderDetailModel;
