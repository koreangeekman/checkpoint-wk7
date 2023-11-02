import { AppState } from "../AppState";
import { TowerEvent } from "../models/TowerEvent.js";
import { Comment } from "../models/Comment.js";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";


class TowerEventsService{

  clearData() {
    AppState.events = [];
    AppState.activeEvent = {};
  }

  async getEvents() {
    const res = await api.get('api/events');
    const events = res.data.map(towerEvent => new TowerEvent(towerEvent));
    AppState.events = events;
    // AppState.activeEvent = AppState.events[0];
    // logger.log('[TOWER EVENTS SERVICE] getEvents(): ', events);
  }

  async getEventById(eventId) {
    const res = await api.get(`api/events/${eventId}`);
    const towerEvent = new TowerEvent(res.data);
    AppState.activeEvent = towerEvent;
    // logger.log('[TOWER EVENTS SERVICE] getEventById(): ', towerEvent);
  }

  async getCommentsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`);
    const comments = res.data.map(comment => new Comment(comment));
    AppState.comments = comments;
    // logger.log('[TOWER EVENTS SERVICE] getCommentsByEventId(): ', comments);
  }

}

export const towerEventsService = new TowerEventsService();