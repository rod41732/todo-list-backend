import { Document, Schema } from "mongoose";

export class User extends Document {
  username: String;
  password: String;
  email: String;
}

export const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});
