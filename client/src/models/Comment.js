
export class Comment{
  constructor(data) {
    this.id = data.id
    this.body = data.body
    this.isAttending = data.isAttending
    this.eventId = data.eventId
    this.creatorId = data.creatorId
    this.creator = data.creator
  }
}