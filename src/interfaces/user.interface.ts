import { Document } from "mongoose";

export interface User extends Document {
  username: String
  password: String
  email: String
}