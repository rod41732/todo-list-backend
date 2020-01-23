import { Document } from "mongoose";

export interface List extends Document {
  owner: String,
  name: String, 
}