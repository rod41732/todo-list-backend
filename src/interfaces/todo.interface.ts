import { Document, SchemaTypes, SchemaType } from "mongoose";

export interface Todo extends Document {
  ownerId: String,
  listId: String,
  sharedWith: [String], // can't use type ObjectId
  created: Date,
  isTrash: Boolean,
  isCompleted: Boolean,
  urgency: Number,
  text: String,
};