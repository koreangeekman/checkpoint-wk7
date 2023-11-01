
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
    const tickets = await dbContext.Tickets.find(query)
      .populate('profile', 'name picture');
    logger.log('[TICKETS SERVICE] getTickets(): ', tickets);
    return tickets
  }

  async getTicketById(ticketId) {
    const ticket = await dbContext.Tickets.findById(ticketId)
      .populate('profile', 'name picture')
      .populate('event', 'name coverImg isCanceled');
    if (!ticket) { throw new BadRequest(`No ticket with ID: ${ticketId}`) }
    logger.log('[TICKETS SERVICE] getTicketById(): ', ticket);
    return ticket
  }

  async getTicketsByTowerEventId(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId })
      .populate('profile', 'name picture')
      .populate('event', 'name coverImg isCanceled location startDate');
    // if (!tickets) { throw new BadRequest(`No tickets with TowerEvent ID: ${eventId}`) }
    logger.log('[TICKETS SERVICE] getTicketsByTowerEventId(): ', tickets);
    return tickets
  }

  async getTicketsByAccountId(accountId) {
    const tickets = await dbContext.Tickets.find({ accountId })
      .populate('profile', 'name picture')
      .populate('event', 'name coverImg isCanceled location startDate');
    // if (!tickets) { throw new BadRequest(`No tickets with TowerEvent ID: ${eventId}`) }
    logger.log('[TICKETS SERVICE] getTicketsByAccountId(): ', tickets);
    return tickets
  }



  // 🔽 REQUIRES AUTHENTICATION 🔽

  async createTicket(body) {
    const newTicket = await dbContext.Tickets.create(body);
    await newTicket.populate('profile', 'name picture');
    await newTicket.populate('event', 'name coverImg isCanceled');
    logger.log('[TICKETS SERVICE] createTicket(): ', newTicket);
    return newTicket
  }

  async removeTicket(ticketId, userId) {
    const toBeDeleted = await dbContext.Tickets.findById(ticketId);
    if (toBeDeleted.accountId.toString() != userId) { throw new Forbidden('UNAUTHORIZED REQUEST: Not your ticket to remove') }
    const results = await dbContext.Tickets.remove(toBeDeleted);
    logger.log('[TICKETS SERVICE] removeTicket(): ', results);
    return results
  }

  async updateTicket(ticketId, newData, userId) {
    const toBeUpdated = await dbContext.Tickets.findById(ticketId);
    if (toBeUpdated.accountId.toString() != userId) { throw new Forbidden('UNAUTHORIZED REQUEST: Not your ticket to update') }
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