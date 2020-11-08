import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { View } from 'react-native-web'
import reducer from './reducers'
// import DeckCard from './components/DeckCard'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import { white, purple } from './utils/colors'
import Quiz from './components/Quiz'

const TabNavigator = {
  Home: {
    name: 'Deck List',
    component: DeckList,
    options: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
      ),
      title: 'Decks',
    },
  },
  AddDeck: {
    name: 'Add Deck',
    component: AddDeck,
    options: {
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="plus-square" size={30} color={tintColor} />
      ),
      title: 'Add Deck',
    },
  },
}

const TabNavigatorConfig = {
  navigationOptions: {
    header: null,
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    },
  },
}

const Tab =
  Platform.OS === 'ios'
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator()

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <View style={{ flex: 1 }}>
        <Quiz />
      </View>
      {/* <NavigationContainer>
        <Tab.Navigator {...TabNavigatorConfig}>
          <Tab.Screen {...TabNavigator.Home} />
          <Tab.Screen {...TabNavigator.AddDeck} />
        </Tab.Navigator>
      </NavigationContainer> */}
    </Provider>
  )
}
