import AsyncStorage from '@react-native-async-storage/async-storage'
import { DATA_STORAGE_KEY } from './keys'
import { decks } from './_DATA'

export const getDecks = async () => {
  try {
    const value = await AsyncStorage.getItem(DATA_STORAGE_KEY)
    if (value === null) {
      await AsyncStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(decks))
    } else {
      return decks
    }
    return JSON.parse(value)
  } catch (e) {
    console.log(e)
  }
}

export const getDeck = async (id) => {
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

export const saveDeckTitle = async (title) => {
  try {
    return await AsyncStorage.mergeItem(
      DATA_STORAGE_KEY,
      JSON.stringify({
        [title]: {
          title,
          questions: [],
        },
      }),
    )
  } catch (e) {
    console.log(e)
  }
}

export const addCardToDeck = async (title, card) => {
  try {
    return await AsyncStorage.mergeItem(
      DATA_STORAGE_KEY,
      JSON.stringify({
        [title]: {
          questions: [...decks.questions].concat(card),
        },
      }),
    )
  } catch (e) {
    console.log(e)
  }
}

export const removeDeck = async (key) => {
  try {
    const results = await AsyncStorage.removeItem(DATA_STORAGE_KEY)
    const data = JSON.parse(results)
    data[key] = undefined
    delete data[key]
    AsyncStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
    console.log(e)
  }
}
