import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/Ticket.js').Ticket[]} */
  tickets: [],
  /** @type {import('./models/TowerEvent.js').TowerEvent[]} */
  events: [],
  /** @type {import('./models/TowerEvent.js').TowerEvent} */
  activeEvent: {},
  /** @type {import('./models/Comment.js').Comment[]} */
  comments: [],
  

})
