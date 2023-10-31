import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { logger } from "../utils/Logger.js";

function _captureData(newData) {
  const updateable = {
    // DEFINE THE PROPERTIES ALLOWED TO UPDATE BELOW
    body: newData.body,
    color: newData.color,
    projectId: newData.projectId,
  }
  return updateable
}

class TowerEventsService {

  async getTowerEvents(query) {
    const towerEvents = await dbContext.TowerEvents.find(query).populate('creator', 'name picture');
    logger.log('[TOWER-EVENTS SERVICE] getTowerEvents(): ', towerEvents);
    return towerEvents
  }

  async getTowerEventById(towerEventId) {
    const towerEvent = await dbContext.TowerEvents.findById(towerEventId).populate('creator', 'name picture');
    if (!towerEvent) { throw new BadRequest(`No towerEvent with ID: ${towerEventId}`) }
    logger.log('[TOWER-EVENTS SERVICE] getTowerEventById(): ', towerEvent);
    return towerEvent
  }

  // 🔽 REQUIRES AUTHENTICATION 🔽

  async createTowerEvent(body) {
    const newTowerEvent = await dbContext.TowerEvents.create(body);
    newTowerEvent.populate('creator', 'name picture')
    logger.log('[TOWER-EVENTS SERVICE] createTowerEvent(): ', newTowerEvent);
    return newTowerEvent
  }

  async removeTowerEvent(towerEventId, userId) {
    const toBeDeleted = await dbContext.TowerEvents.findById(towerEventId);
    if (toBeDeleted.creatorId != userId) { throw new Forbidden('UNAUTHORIZED REQUEST: Not your towerEvent to remove') }
    const results = await dbContext.TowerEvents.remove(towerEventId);
    logger.log('[TOWER-EVENTS SERVICE] removeTowerEvent(): ', results);
    return toBeDeleted
  }

  async updateTowerEvent(towerEventId, newData, userId) {
    const toBeUpdated = await dbContext.TowerEvents.findById(towerEventId);
    if (toBeUpdated.creatorId != userId) { throw new Forbidden('UNAUTHORIZED REQUEST: Not your towerEvent to update') }
    const update = _captureData(newData);
    const updated = await dbContext.TowerEvents.findOneAndUpdate(
      { _id: towerEventId },
      { $set: update },
      { runValidators: true, setDefaultsOnInsert: true, new: true }
    );
    logger.log('[TOWER-EVENTS SERVICE] updateTowerEvent(): ', updated);
    return updated
  }

}

export const towerEventsService = new TowerEventsService();