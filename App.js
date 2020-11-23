import 'react-native-gesture-handler'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Platform, View } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Constants from 'expo-constants'
import { createStackNavigator } from '@react-navigation/stack'
import reducer from './reducers'
import middleware from './middleware'
import DeckView from './components/DeckView'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import { white, purple, darkPurp } from './utils/colors'
import QuizView from './components/QuizView'

function FlashStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const TabNavigator = {
  Home: {
    name: 'DeckList',
    component: DeckList,
    options: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
      ),
      title: 'Decks',
    },
  },
  AddDeck: {
    name: 'AddDeck',
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
      backgroundColor: Platform.OS === 'ios' ? white : darkPurp,
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

const TabNav = () => (
  <Tab.Navigator {...TabNavigatorConfig}>
    <Tab.Screen {...TabNavigator.Home} />
    <Tab.Screen {...TabNavigator.AddDeck} />
  </Tab.Navigator>
)

// Config for StackNav
const StackNavigatorConfig = {
  headerMode: 'screen',
}
const StackConfig = {
  TabNav: {
    name: 'Home',
    component: TabNav,
    options: { headerShown: false },
  },
  DeckView: {
    name: 'DeckView',
    component: DeckView,
    options: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
      title: 'Deck View',
    },
  },
  AddCard: {
    name: 'AddCard',
    component: AddCard,
    options: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
      title: 'Add Card',
    },
  },
  QuizView: {
    name: 'QuizView',
    component: QuizView,
    options: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
      title: ' Quiz View',
    },
  },
}
const Stack = createStackNavigator()
const MainNav = () => (
  <Stack.Navigator {...StackNavigatorConfig}>
    <Stack.Screen {...StackConfig.TabNav} />
    <Stack.Screen {...StackConfig.DeckView} />
    <Stack.Screen {...StackConfig.AddCard} />
    <Stack.Screen {...StackConfig.QuizView} />
  </Stack.Navigator>
)
export default function App() {
  return (
    <Provider store={createStore(reducer, middleware)}>
      <View style={{ flex: 1 }}>
        <FlashStatusBar backgroundColor={darkPurp} barStyle="light-content" />
        <NavigationContainer>
          <MainNav />
        </NavigationContainer>
      </View>
    </Provider>
  )
}
