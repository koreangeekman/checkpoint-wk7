import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { logger } from "../utils/Logger.js";
import { ticketsService } from "./TicketsService.js";

function _captureData(newData) {
  const updateable = {
    // DEFINE THE PROPERTIES ALLOWED TO UPDATE BELOW
    name: newData.name,
    description: newData.description,
    isCanceled: newData.isCanceled,
    coverImg: newData.coverImg,
    location: newData.location,
    capacity: newData.capacity,
    startDate: newData.startDate,
    type: newData.type
  }
  return updateable
}

async function _cancelEvent(eventObj) {

}

class TowerEventsService {

  async getTowerEvents(query) {
    const towerEvents = await dbContext.TowerEvents.find(query)
      .populate('creator', 'name picture')
      .populate('ticketCount');
    // logger.log('[TOWER-EVENTS SERVICE] getTowerEvents(): ', towerEvents);
    return towerEvents
  }

  async getTowerEventById(eventId) {
    const towerEvent = await dbContext.TowerEvents.findById(eventId)
      .populate('creator', 'name picture')
      .populate('ticketCount');
    if (!towerEvent) { throw new BadRequest(`No towerEvent with ID: ${eventId}`) }
    // logger.log('[TOWER-EVENTS SERVICE] getTowerEventById(): ', towerEvent);
    return towerEvent
  }

  // 🔽 REQUIRES AUTHENTICATION 🔽

  async createTowerEvent(body) {
    const newTowerEvent = await dbContext.TowerEvents.create(body);
    await newTowerEvent.populate('creator', 'name picture');
    await newTowerEvent.populate('ticketCount');
    // logger.log('[TOWER-EVENTS SERVICE] createTowerEvent(): ', newTowerEvent);
    return newTowerEvent
  }

  async removeTowerEvent(eventId, userId) {
    const tickets = await ticketsService.getTicketsByTowerEventId(eventId);
    const toBeDeleted = await dbContext.TowerEvents.findById(eventId);
    if (toBeDeleted.creatorId != userId) { throw new Forbidden('UNAUTHORIZED REQUEST: Not your towerEvent to remove') }
    // if (tickets) {
    toBeDeleted.isCanceled = true;
    await dbContext.TowerEvents.findOneAndUpdate(
      { _id: eventId },
      { $set: toBeDeleted }
    );
    // return "Event has been canceled."
    // }
    // const results = await dbContext.TowerEvents.remove(toBeDeleted);
    // logger.log('[TOWER-EVENTS SERVICE] removeTowerEvent(): ', results);
    return toBeDeleted
  }

  async updateTowerEvent(eventId, newData, userId) {
    const toBeUpdated = await dbContext.TowerEvents.findById(eventId);
    if (toBeUpdated.creatorId != userId) { throw new Forbidden('UNAUTHORIZED REQUEST: Not your towerEvent to update') }
    const update = _captureData(newData);
    const updated = await dbContext.TowerEvents.findOneAndUpdate(
      { _id: eventId },
      { $set: update },
      { runValidators: true, setDefaultsOnInsert: true, new: true }
    );
    logger.log('[TOWER-EVENTS SERVICE] updateTowerEvent(): ', updated);
    return updated
  }

}

export const towerEventsService = new TowerEventsService();