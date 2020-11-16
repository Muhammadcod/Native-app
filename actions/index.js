import { getDecks } from '../utils/api'

export const RECEIVE_DECK = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const REMOVE_DECK = 'REMOVE_DECK'

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECK,
    decks,
  }
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}
export function addCardToDeck(deckId, card) {
  return {
    type: ADD_CARD,
    deckId,
    card,
  }
}

export function removeDeck(id) {
  return {
    type: REMOVE_DECK,
    id,
  }
}
export function handleInitialData() {
  return (dispatch) =>
    getDecks().then((decks) => {
      dispatch(receiveDecks(decks))
    })
}
