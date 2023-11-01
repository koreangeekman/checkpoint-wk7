import { AppState } from "../AppState";
import { TowerEvent } from "../models/TowerEvent";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";


class TowerEventsService{

  async getEvents() {
    const res = await api.get('api/events');
    const events = res.data.map(towerEvent => new TowerEvent(towerEvent));
    AppState.events = events;
    logger.log('[TOWER EVENTS SERVICE] getEvents(): ', events);
  }
}

export const towerEventsService = new TowerEventsService();