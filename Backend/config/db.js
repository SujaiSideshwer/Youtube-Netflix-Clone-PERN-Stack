import pg from "pg";
import { ENV_VARS } from "./envVars.js";
import { createSchemaSQL } from "../models/user.model.js";

const { Client } = pg;

const db = new Client({
  user: ENV_VARS.PG_USER,
  host: ENV_VARS.PG_HOST,
  database: ENV_VARS.PG_DB_NAME,
  password: ENV_VARS.PG_PASSWORD,
  port: ENV_VARS.PG_PORT,
});
await db.connect();

export const connectDB = async () => {
  try {
    const res = await db.query("SELECT $1::text as message", ["Hello world!"]);
    await db.query(createSchemaSQL);
    console.log(res.rows[0].message); // Hello world!
  } catch (err) {
    console.error(err);
  }
  //   finally {
  //     await db.end();
  //   }
};

export default db;
