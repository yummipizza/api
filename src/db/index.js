// @vendors
import Sequelize from "sequelize";
// @config
import dbConfig from "../config";

export const sequelize = new Sequelize(
  dbConfig.get("database.dbName"),
  dbConfig.get("database.username"),
  dbConfig.get("database.password"),
  {
    host: dbConfig.get("database.host"),
    dialect: "mysql",
  }
);
