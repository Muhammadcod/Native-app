export const RECEIVE_DECK = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'

export function receiveDecks (decks) {
    return {
        type: RECEIVE_DECK,
        decks,
    }
}

export function addEntry (deck) {
    return {
        type: ADD_DECK,
        deck,
    }
}
