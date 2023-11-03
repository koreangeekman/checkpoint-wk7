
export class TowerEvent {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.coverImg = data.coverImg
    this.location = data.location
    this.capacity = data.capacity
    this.ticketCount = data.ticketCount
    this.startDate = data.startDate ? new Date(data.startDate) : null
    this.isCanceled = data.isCanceled
    this.type = data.type
    this.await = false
    this.creatorId = data.creatorId
    this.creator = data.creator
  }
}
