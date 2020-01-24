import { SchemaTypes, Schema, SchemaType, Document }from 'mongoose';


enum Urgency {
  None = 0,
  Low = 1,
  Medium = 2,
  High = 3,
}

export class Todo extends Document {
  ownerId: String;
  listId: String;
  sharedWith: String[];
  created: Date;
  isTrash: Boolean;
  isCompleted: Boolean;
  urgency: Number;
  text: String;
}

export const TodoSchema = new Schema({
  ownerId: {
    // TODO foreign key check
    type: SchemaTypes.ObjectId,
    required: true,
  },
  listId: {
    type: SchemaTypes.ObjectId,
  },
  sharedWith: {
    type: [SchemaTypes.ObjectId],
    default: [],
  },
  created: {
    type: Date,
    default: Date.now,
  },
  isTrash: {
    type: Boolean,
    default: false,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  urgency: {
    type: Number,
    required: true,
    min: 0,
    max: 3,
  },
  text: {
    type: String,
    required: true,
  },
})
