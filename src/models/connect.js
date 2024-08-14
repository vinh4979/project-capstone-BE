import { Sequelize } from "sequelize";
import config from "../configs/config.js";

const sequelize = new Sequelize(config.database, config.root, config.pass, {
  host: config.localhost,
  port: config.port,
  dialect: config.dialect,
});

console.log(config);

export default sequelize;
