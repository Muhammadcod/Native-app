import AsyncStorage from '@react-native-async-storage/async-storage';
import {DATA_STORAGE_KEY} from './keys'

export async function getDecks() {
    try {
        const value = await AsyncStorage.getItem('DATA_STORAGE_KEY')
        console.log(value)
        if(value !== null) {
            // TODO value previously stored
        }
    } catch(e) {
        // TODO error reading value
    }
}
