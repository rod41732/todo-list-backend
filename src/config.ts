import * as dotenv from 'dotenv';

dotenv.config()

export const config = {
  jwtSecret: process.env.SECRET,
};