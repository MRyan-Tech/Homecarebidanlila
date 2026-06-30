import { Sequelize } from "sequelize";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, "../../database.sqlite");

console.log("DATABASE PATH:", dbPath);

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: dbPath,
  logging: false, // set to console.log to see SQL queries
});

export default sequelize;
