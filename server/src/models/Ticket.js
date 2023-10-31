import { Schema } from "mongoose";

export const TicketSchema = new Schema({
  id: { type: String, required: true },
  eventId: { type: Schema.Types.ObjectId, required: true, ref: 'TowerEvent' },
  accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
}, { timestamps: true, toJSON: { virtuals: true } })

TicketSchema.virtual('profile', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

TicketSchema.virtual('event', {
  localField: 'eventId',
  foreignField: '_id',
  ref: 'TowerEvent',
  justOne: true
})