import Sequelize from "sequelize";
import { sequelize } from "../";

export const AuxiliaryField = sequelize.define(
  "auxiliary_fields",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    description: Sequelize.STRING,
    field_id: Sequelize.INTEGER,
    field_description: Sequelize.STRING,
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "auxiliary_fields",
  }
);
