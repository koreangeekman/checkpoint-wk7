import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { Comment } from "../models/Comment"
import { Ticket } from "../models/Ticket"
import { TowerEvent } from "../models/TowerEvent"
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getEventsByAccountId() {
    const res = await api.get('/account/events');
    const events = res.data.map(towerEvent => new TowerEvent(towerEvent));
    AppState.events = events;
    logger.log('[ACCOUNTS SERVICE] getEventsByAccountId(): ', events);
  }

  async getTicketsByAccountId() {
    const res = await api.get('/account/tickets');
    const tickets = res.data.map(ticket => new Ticket(ticket));
    AppState.tickets = tickets;
    logger.log('[ACCOUNTS SERVICE] getTicketsByAccountId(): ', tickets);
  }

  async getCommentsByAccountId() {
    const res = await api.get('/account/comments');
    const comments = res.data.map(comment => new Comment(comment));
    AppState.comments = comments;
    logger.log('[ACCOUNTS SERVICE] getCommentsByAccountId(): ', comments);
  }

}

export const accountService = new AccountService()
