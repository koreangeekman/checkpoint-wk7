import { AppState } from "../AppState";

class TicketsService{

  clearData() {
    AppState.tickets = [];
  }
  
}

export const ticketsService = new TicketsService();