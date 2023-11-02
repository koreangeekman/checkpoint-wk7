import { AppState } from "../AppState";
import { TowerEvent } from "../models/TowerEvent.js";
import { Comment } from "../models/Comment.js";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";
import { Ticket } from "../models/Ticket";


class TowerEventsService{

  clearData() {
    AppState.events = [];
    AppState.activeEvent = {};
  }

  async getEvents() {
    const res = await api.get('api/events');
    const events = res.data.map(towerEvent => new TowerEvent(towerEvent));
    AppState.events = events;
    // logger.log('[TOWER EVENTS SERVICE] getEvents(): ', events);
  }

  async getEventById(eventId) {
    const res = await api.get(`api/events/${eventId}`);
    const towerEvent = new TowerEvent(res.data);
    AppState.activeEvent = towerEvent;
    // logger.log('[TOWER EVENTS SERVICE] getEventById(): ', towerEvent);
  }

  async getTicketsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`);
    const tickets = res.data.map(ticket => new Ticket(ticket));
    AppState.tickets = tickets;
    // logger.log('[TOWER EVENTS SERVICE] getTicketsByEventId(): ', tickets);
  }

  async getCommentsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`);
    const comments = res.data.map(comment => new Comment(comment));
    AppState.comments = comments;
    // logger.log('[TOWER EVENTS SERVICE] getCommentsByEventId(): ', comments);
  }
  
  async cancelEvent() {
    const res = await api.delete(`api/events/${AppState.activeEvent.id}`)
    logger.log('[TOWER EVENTS SERVICE] cancelEvent(): ', res.data);
  }

}

export const towerEventsService = new TowerEventsService();