import * as dotenv from 'dotenv';

dotenv.config()

export const config = {
  jwtSecret: process.env.SECRET,
  dbName: process.env.DB_NAME,
  port: process.env.PORT,
};