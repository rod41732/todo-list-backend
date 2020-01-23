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
    type: String,
    required: true,
    enum: ['low', 'medium', 'high', 'none'],
    default: 'none',
  },
  text: {
    type: String,
    required: true,
  },
})
