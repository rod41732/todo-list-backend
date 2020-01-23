import { SchemaTypes, Schema, SchemaType }from 'mongoose';

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
