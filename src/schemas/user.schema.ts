import { Document, Schema } from "mongoose";

export const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
})