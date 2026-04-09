import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, "../.env");

dotenv.config({ path: envPath });

export const PORT = process.env.PORT || 5000;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT || 3306;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;

if (!DB_HOST || !DB_USER || !DB_NAME) {
  throw new Error("Missing required database environment variables in .env");
}
