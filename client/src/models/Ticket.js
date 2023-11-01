
export class Ticket{
  constructor(data) {
    this.id = data.id
    this.eventId = data.eventId
    this.event = data.event
    this.profileId = data.profileId
    this.profile = data.profile
  }
}