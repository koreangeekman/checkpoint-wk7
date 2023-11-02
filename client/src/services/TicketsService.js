import { AppState } from "../AppState";
import { Ticket } from "../models/Ticket";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { api } from "./AxiosService";

class TicketsService{

  clearData() {
    AppState.tickets = [];
  }

  // async getTicketById(ticketId) {
  //   const res = await api.get(`api/tickets/${ticketId}`);
  //   AppState.activeTicket = new Ticket(res.data);
  // }

  async getTicketsByAccountId() {
    const res = await api.get('api/account/tickets');
    const tickets = res.data.map(ticket => new Ticket(ticket));
    AppState.tickets = tickets;
  }

  async createTicket() {
    const body = {
      accountId: AppState.account.id,
      eventId: AppState.activeEvent.id
    }
    const res = await api.post('api/tickets', body);
    const newTicket = new Ticket(res.data);
    AppState.tickets.push(newTicket);
  }

  async deleteTicket(ticketObj) {
    const ticketIndex = AppState.tickets.findIndex(ticket => ticket.id == ticketObj.id);
    if (ticketIndex == -1) { throw new Error('Cannot find ticket') }
    if (ticketObj.profileId != AppState.account.id) { throw new Error('Not your ticket to cancel') }
    const res = await api.delete(`api/tickets/${ticketObj.id}`)
    AppState.tickets.splice(ticketIndex, 1);
    logger.log('Deleted ticket: ', ticketObj, 'results: ', res.data)
  }
  
}

export const ticketsService = new TicketsService();