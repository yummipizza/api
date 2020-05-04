// // @vendors
// import Sequelize from "sequelize";
// // @config
// import dbConfig from "../../config";

// const sequelize = new Sequelize(
//   dbConfig.get("database.dbName"),
//   dbConfig.get("database.username"),
//   dbConfig.get("database.password"),
//   {
//     host: dbConfig.get("database.host"),
//     dialect: "mysql",
//   }
// );

// const models = {
//   Product: sequelize.import("./product"),
//   AuxiliaryField: sequelize.import("./AuxiliaryField"),
//   ProductSize: sequelize.import("./ProductSize"),
//   Client: sequelize.import("./Client"),
//   Orders: sequelize.import("./Orders"),
//   OrderDetail: sequelize.import("./OrderDetail"),
// };

// console.log(models);

// Object.keys(models).forEach((key) => {
//   if ("associate" in models[key]) {
//     models[key].associate(models);
//   }
// });

// models.sequelize = sequelize;
// models.Sequelize = Sequelize;

// export const Models = models;

export * from "./auxiliaryField";
export * from "./client";
export * from "./orderDetail";
export * from "./orders";
export * from "./product";
export * from "./productSize";
