import { RECEIVE_DECK, ADD_DECK, ADD_CARD } from '../actions'

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECK:
      return {
        ...state,
        ...action.decks,
      }
    case ADD_DECK:
      return {
        ...state,
        [action.title]: {
          title: action.title,
          questions: [],
        },
      }
    case ADD_CARD:
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          questions: [state[action.deckId].questions].concat(action.card),
        },
      }
    /* case REMOVE_DECK:
      return {
        ...state,
        [action.id]: {},
      } */
    default:
      return state
  }
}

export default decks
