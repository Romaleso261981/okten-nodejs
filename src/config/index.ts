import dotenv from "dotenv";

dotenv.config();

export default {
  APP_HOST: process.env.APP_HOST,
  PORT: process.env.PORT,
  BD_URI: process.env.DB_URI,
  ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY,
};
