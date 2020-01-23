import { SchemaType, Schema, SchemaTypes } from "mongoose";

export const ListSchema = new Schema({
  owner: SchemaTypes.ObjectId,
  name: {
    type: String,
    required: true,
  },
})