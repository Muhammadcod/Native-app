import {RECEIVE_DECK, ADD_DECK} from '../actions';

function decks(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECK:
            return {
                ...state,
                ...action.decks,
            };
        case ADD_DECK:
            return {
                ...state,
                ...action.deck,
            };
        default:
            return state;
    }
}

export default decks;
