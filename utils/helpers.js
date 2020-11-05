import AsyncStorage from '@react-native-async-storage/async-storage';
import {DATA_STORAGE_KEY} from './keys'
import {decks} from './_DATA'

export async function getDecks() {
    try {
        const value = await AsyncStorage.getItem(DATA_STORAGE_KEY)
        if (value === null) {
            await AsyncStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(decks))
        } else {
            return decks
        }
        console.log(value)
        return JSON.parse(value)
    } catch (e) {
        console.log(e)
    }
}

export async function getDeck(id) {
    try {
        const value = await AsyncStorage.getItem(DATA_STORAGE_KEY)
        if (value !== null) {
            console.log('deck.id', JSON.parse(value)[id])
            return JSON.parse(value)[id]
        }
    } catch (e) {
        console.log(e)
    }
}

export async function saveDeckTitle(title) {
    try {
        let newDeck;
        newDeck = await AsyncStorage.mergeItem(DATA_STORAGE_KEY, JSON.stringify({
            [title]: {
                title: "",
                questions: [],
            }
        }));
       return newDeck

    } catch (e) {
        console.log(e)
    }
}

export  async function addCardToDeck(title, card) {
    try {
        let newCard;
        newCard = await AsyncStorage.mergeItem(DATA_STORAGE_KEY, JSON.stringify({
            [title]: {
                questions: [...decks.questions].concat(card),
            }
        }));
        return newCard
    } catch (e) {
        console.log(e)
    }
}
