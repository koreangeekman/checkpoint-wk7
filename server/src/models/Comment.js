import { Schema } from "mongoose";

export const CommentSchema = new Schema({
  body: { type: String, required: true, maxLength: 1000 },
  isAttending: { type: Boolean, required: true, default: false },
  eventId: { type: Schema.Types.ObjectId, required: true, ref: 'TowerEvent' },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
}, { timestamps: true, toJSON: { virtuals: true } })

CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
