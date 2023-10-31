import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController.js"
import { ticketsService } from "../services/TicketsService.js"

export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .get('', this.getTickets)
      .get('/:ticketId', this.getTicketById)
      // 🔽 REQUIRES AUTHENTICATION 🔽
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
      .put('/:ticketId', this.updateTicket)
      .delete('/:ticketId', this.removeTicket)
  }

  async getTickets(req, res, nxt) {
    try {
      const tickets = await ticketsService.getTickets(req.query);
      return res.send(tickets)
    } catch (error) {
      nxt(error)
    }
  }

  async getTicketById(req, res, nxt) {
    try {
      const tickets = await ticketsService.getTicketById(req.params.ticketId);
      return res.send(tickets)
    } catch (error) {
      nxt(error)
    }
  }

  // 🔽 REQUIRES AUTHENTICATION 🔽

  async createTicket(req, res, nxt) {
    try {
      req.body.creatorId = req.userInfo.id
      const tickets = await ticketsService.createTicket(req.body);
      return res.send(tickets)
    } catch (error) {
      nxt(error)
    }
  }

  async updateTicket(req, res, nxt) {
    try {
      const toBeUpdated = await ticketsService.updateTicket(req.params.ticketId, req.body, req.userInfo.id);
      return res.send(toBeUpdated)
    } catch (error) {
      nxt(error)
    }
  }

  async removeTicket(req, res, nxt) {
    try {
      const toBeDeleted = await ticketsService.removeTicket(req.params.ticketId, req.userInfo.id);
      return res.send(toBeDeleted)
    } catch (error) {
      nxt(error)
    }
  }

}