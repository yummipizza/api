import path from "path";
import convict from "convict";

const config = convict({
  env: {
    format: ["production", "development", "test"],
    default: "development",
    arg: "env",
    env: "NODE_ENV",
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 8000,
    env: "PORT",
  },
  database: {
    host: {
      default: "",
      arg: "host",
      env: "DB_HOST",
    },
    dbName: {
      default: "",
      arg: "dbName",
      env: "DB_NAME",
    },
    username: {
      default: "",
      arg: "username",
      env: "DB_USERNAME",
    },
    password: {
      default: "",
      arg: "password",
      env: "DB_PASSWORD",
    },
    port: {
      default: 3306,
      format: "port",
      arg: "dbPort",
      env: "DB_PORT",
    },
  },
});

const env = config.get("env");

if (env !== "production") {
  const filePath = path.join(__dirname, `${env}.json`);
  config.loadFile(filePath);
}

config.validate();

export default config;
