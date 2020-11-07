import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import Deck from './Deck'

class DeckList extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    getDecks().then((decks) => dispatch(receiveDecks(decks)))
  }

  _onPressButton() {
    alert('You tapped the button!')
  }

  render() {
    const { decks } = this.props

    return (
      <>
        {Object.values(decks).map((deck) => (
          <TouchableOpacity onPress={this._onPressButton}>
            <Deck key={deck.title} id={deck.title} />
          </TouchableOpacity>
        ))}
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    decks: state,
  }
}

export default connect(mapStateToProps)(DeckList)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
