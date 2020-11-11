import React, { Component } from 'react'
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import Deck from './Deck'

class DeckList extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    getDecks().then((decks) => dispatch(receiveDecks(decks)))
  }

  /* _onPressButton() {
    alert('You tapped the button!')
  } */

  render() {
    const { decks, navigation } = this.props

    return (
      <ScrollView>
        {Object.values(decks).map((deck) => (
          <TouchableOpacity
            key={deck.title}
            onPress={() =>
              navigation.navigate('DeckView', { title: deck.title })
            }
          >
            <Deck id={deck.title} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  return {
    decks: state,
  }
}

export default connect(mapStateToProps)(DeckList)
