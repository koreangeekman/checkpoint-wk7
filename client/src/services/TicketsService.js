import { AppState } from "../AppState";
import { Ticket } from "../models/Ticket";
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
  
}

export const ticketsService = new TicketsService();