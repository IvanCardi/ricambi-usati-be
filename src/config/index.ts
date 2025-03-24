import * as dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.IS_PRODUCTION === "true";

const db = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  name: process.env.DB_NAME,
};

const server = {
  port: process.env.SERVER_PORT,
};

const salt = process.env.BCRYPT_SALT_ROUNDS
  ? parseFloat(process.env.BCRYPT_SALT_ROUNDS)
  : 10;

export { isProduction, db, server, salt };
