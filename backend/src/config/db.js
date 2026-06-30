import { Sequelize } from "sequelize";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const databaseUrl = process.env.DATABASE_URL;
let sequelize;

if (databaseUrl) {
  console.log("DATABASE: Connecting to PostgreSQL Cloud Database");
  sequelize = new Sequelize(databaseUrl, {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Required for Neon/Supabase SSL connections
      },
    },
    logging: false,
  });
} else {
  console.log("DATABASE: Connecting to Local SQLite Database");
  const isVercel = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_VERSION;
  const dbPath = isVercel
    ? "/tmp/database.sqlite"
    : path.resolve(__dirname, "../../database.sqlite");

  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: dbPath,
    logging: false,
  });
}

export default sequelize;
