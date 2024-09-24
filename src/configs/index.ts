import dotenv from "dotenv";

dotenv.config();

export default {
  APP_HOST: process.env.APP_HOST,
  PORT: process.env.PORT,
  BD_URI: process.env.DB_URI,

  ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY,
  ACCESS_REFRESH_KEY: process.env.ACCESS_REFRESH_KEY,
  JWT_ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION,
  JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION,

  SMTP_EMAIL: process.env.SMTP_EMAIL,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
};
