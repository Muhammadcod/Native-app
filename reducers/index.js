import { RECEIVE_DECK, ADD_DECK, ADD_CARD, REMOVE_DECK } from '../actions'
import { decks as initialState } from '../utils/_DATA'

function decks(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_DECK:
      return {
        ...state,
        ...action.decks,
      }
    case ADD_DECK:
      const { title } = action
      return {
        ...state,
        [title]: {
          title,
          questions: [],
        },
      }
    case ADD_CARD:
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          questions: [...state[action.deckId].questions].concat(action.card),
        },
      }
    case REMOVE_DECK:
      const { id } = action
      const newState = Object.assign({}, state)
      newState[id] = undefined
      delete newState[id]
      return newState
    default:
      return state
  }
}

export default decks
