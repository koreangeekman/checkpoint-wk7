import { Schema } from "mongoose";

export const TowerEventSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true, maxLength: 50 },
  description: { type: String, required: true, maxLength: 500 },
  coverImg: { type: String, required: true, maxLength: 200 },
  location: { type: String, required: true, maxLength: 50 },
  capacity: { type: Number, required: true },
  startDate: { type: Date, required: true },
  isCancelled: { type: Boolean, required: true, default: false },
  type: { type: Boolean, required: true, enum: ['concert', 'convention', 'sport', 'digital'] },
  creatorId: { type: Date, required: true, ref: 'Account' },
}, { timestamps: true, toJSON: { virtuals: true } })

TowerEventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

TowerEventSchema.virtual('ticketCount', {
  localField: '_id',
  foreignField: 'eventId',
  ref: 'Ticket',
  count: true
})