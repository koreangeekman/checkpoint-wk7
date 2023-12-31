import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController.js"
import { towerEventsService } from "../services/TowerEventsService.js"
import { commentsService } from "../services/CommentsService.js"
import { ticketsService } from "../services/TicketsService.js"

export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getTowerEvents)
      .get('/:eventId', this.getTowerEventById)
      .get('/:eventId/comments', this.getCommentsByTowerEventId)
      .get('/:eventId/tickets', this.getTicketsByTowerEventId)
      // 🔽 REQUIRES AUTHENTICATION 🔽
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTowerEvent)
      .put('/:eventId', this.updateTowerEvent)
      .delete('/:eventId', this.removeTowerEvent)
  }

  async getTowerEvents(req, res, nxt) {
    try {
      const towerEvents = await towerEventsService.getTowerEvents(req.query);
      return res.send(towerEvents)
    } catch (error) {
      nxt(error)
    }
  }

  async getTowerEventById(req, res, nxt) {
    try {
      const towerEvents = await towerEventsService.getTowerEventById(req.params.eventId);
      return res.send(towerEvents)
    } catch (error) {
      nxt(error)
    }
  }

  async getTicketsByTowerEventId(req, res, nxt) {
    try {
      const tickets = await ticketsService.getTicketsByTowerEventId(req.params.eventId);
      return res.send(tickets)
    } catch (error) {
      nxt(error)
    }
  }

  async getCommentsByTowerEventId(req, res, nxt) {
    try {
      const comments = await commentsService.getCommentsByTowerEventId(req.params.eventId);
      return res.send(comments)
    } catch (error) {
      nxt(error)
    }
  }

  // 🔽 REQUIRES AUTHENTICATION 🔽

  async createTowerEvent(req, res, nxt) {
    try {
      req.body.creatorId = req.userInfo.id
      const towerEvents = await towerEventsService.createTowerEvent(req.body);
      return res.send(towerEvents)
    } catch (error) {
      nxt(error)
    }
  }

  async updateTowerEvent(req, res, nxt) {
    try {
      const toBeUpdated = await towerEventsService.updateTowerEvent(req.params.eventId, req.body, req.userInfo.id);
      return res.send(toBeUpdated)
    } catch (error) {
      nxt(error)
    }
  }

  async removeTowerEvent(req, res, nxt) {
    try {
      const toBeDeleted = await towerEventsService.removeTowerEvent(req.params.eventId, req.userInfo.id);
      return res.send(toBeDeleted)
    } catch (error) {
      nxt(error)
    }
  }

}