import { Document } from "mongoose";

export interface List extends Document {
  owner: String,
  name: String, 
}

import { SchemaType, Schema, SchemaTypes } from "mongoose";

export const ListSchema = new Schema({
  owner: SchemaTypes.ObjectId,
  name: {
    type: String,
    required: true,
  },
})