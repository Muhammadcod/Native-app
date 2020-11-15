import React, { Component } from 'react'
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components/native'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import Deck from './Deck'
import { black, white, red, darkPurp } from '../utils/colors'

const StyledView = styled(ScrollView)`
  background: ${(props) => (props.primary ? darkPurp : 'white')};
  padding: 15px;
`

class DeckList extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    getDecks().then((decks) => dispatch(receiveDecks(decks)))
  }

  render() {
    const { decks, navigation } = this.props

    return (
      <StyledView primary>
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
      </StyledView>
    )
  }
}

function mapStateToProps(state) {
  return {
    decks: state,
  }
}

export default connect(mapStateToProps)(DeckList)
