import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { ticketsService } from "../services/TicketsService.js"
import { towerEventsService } from "../services/TowerEventsService.js"
import { commentsService } from "../services/CommentsService.js"

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/tickets', this.getTicketsByAccountId)
      .get('/events', this.getEventsByAccountId)
      .get('/comments', this.getCommentsByAccountId)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getTicketsByAccountId(req, res, next) {
    try {
      const tickets = await ticketsService.getTicketsByAccountId(req.userInfo.id)
      res.send(tickets)
    } catch (error) {
      next(error)
    }
  }

  async getEventsByAccountId(req, res, next) {
    try {
      const events = await towerEventsService.getEventsByAccountId(req.userInfo.id)
      res.send(events)
    } catch (error) {
      next(error)
    }
  }

  async getCommentsByAccountId(req, res, next) {
    try {
      const comments = await commentsService.getCommentsByAccountId(req.userInfo.id)
      res.send(comments)
    } catch (error) {
      next(error)
    }
  }

}
