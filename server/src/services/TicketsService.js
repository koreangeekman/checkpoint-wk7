
import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { logger } from "../utils/Logger.js";

function _captureData(newData) {
  const updateable = {
    // DEFINE THE PROPERTIES ALLOWED TO UPDATE BELOW
    eventId: newData.eventId,
    accountId: newData.accountId,
  }
  return updateable
}

class TicketsService {

  async getTickets(query) {
    const tickets = await dbContext.Tickets.find(query).populate('creator', 'name picture');
    logger.log('[TICKETS SERVICE] getTickets(): ', tickets);
    return tickets
  }

  async getTicketById(ticketId) {
    const ticket = await dbContext.Tickets.findById(ticketId).populate('creator', 'name picture');
    if (!ticket) { throw new BadRequest(`No ticket with ID: ${ticketId}`) }
    logger.log('[TICKETS SERVICE] getTicketById(): ', ticket);
    return ticket
  }

  // 🔽 REQUIRES AUTHENTICATION 🔽

  async createTicket(body) {
    const newTicket = await dbContext.Tickets.create(body);
    newTicket.populate('creator', 'name picture')
    logger.log('[TICKETS SERVICE] createTicket(): ', newTicket);
    return newTicket
  }

  async removeTicket(ticketId, userId) {
    const toBeDeleted = await dbContext.Tickets.findById(ticketId);
    if (toBeDeleted.accountId != userId) { throw new Forbidden('UNAUTHORIZED REQUEST: Not your ticket to remove') }
    const results = await dbContext.Tickets.remove(ticketId);
    logger.log('[TICKETS SERVICE] removeTicket(): ', results);
    return toBeDeleted
  }

  async updateTicket(ticketId, newData, userId) {
    const toBeUpdated = await dbContext.Tickets.findById(ticketId);
    if (toBeUpdated.accountId != userId) { throw new Forbidden('UNAUTHORIZED REQUEST: Not your ticket to update') }
    const update = _captureData(newData);
    const updated = await dbContext.Tickets.findOneAndUpdate(
      { _id: ticketId },
      { $set: update },
      { runValidators: true, setDefaultsOnInsert: true, new: true }
    );
    logger.log('[TICKETS SERVICE] updateTicket(): ', updated);
    return updated
  }

}

export const ticketsService = new TicketsService();