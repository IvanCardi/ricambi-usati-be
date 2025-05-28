import * as dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.IS_PRODUCTION === "true";

const db = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  name: process.env.DB_NAME,
  productionUrl: process.env.MONGO_URL ?? "",
};

const server = {
  port: process.env.SERVER_PORT,
};

const salt = process.env.BCRYPT_SALT_ROUNDS
  ? parseFloat(process.env.BCRYPT_SALT_ROUNDS)
  : 10;

const access = {
  secret: process.env.ACCESS_SECRET || "access_secret",
  expiresIn: (process.env.ACCESS_EXPIRES_IN || "1m") as any,
};
const refresh = {
  secret: process.env.REFRESH_SECRET || "refresh_secret",
  expiresIn: (process.env.REFRESH_EXPIRES_IN || "1m") as any,
};

const urls = {
  be: process.env.BE_BASE_URL ?? "",
  fe: process.env.FE_BASE_URL ?? "",
};

const mollieSecretKey = process.env.MOLLIE_KEY ?? "";

export {
  isProduction,
  db,
  server,
  salt,
  access,
  refresh,
  urls,
  mollieSecretKey,
};
