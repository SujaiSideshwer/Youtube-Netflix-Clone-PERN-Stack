import dotenv from "dotenv";

dotenv.config();

export const ENV_VARS = {
  PG_USER: process.env.PGUSER,
  PG_PORT: process.env.PGPORT,
  PG_HOST: process.env.PGHOST,
  PG_PASSWORD: process.env.PGPASSWORD,
  PG_DB_NAME: process.env.PGDB_NAME,
  BACKEND_SERVER_PORT: process.env.SERVER_PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  MY_API_KEY: process.env.MY_API_KEY,
};
