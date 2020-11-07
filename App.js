import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
// import DeckList from './components/DeckList'
import DeckCard from './components/DeckCard'

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        {/* <DeckList /> */}
        <DeckCard />
      </View>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: '15px',
    paddingRight: '15px',
  },
})
