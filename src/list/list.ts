import { Document, Schema, SchemaTypes } from "mongoose";

export class List extends Document {
  ownerId: String;
  name: String;
}


export const ListSchema = new Schema({
  ownerId: {
    type: SchemaTypes.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
})