import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components/native'

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.View`
  background: papayawhip;
  border: 1px solid black;
  text-align: center;
  padding: 50px 10px;
  margin-bottom: 10px;
`

class Deck extends Component {
  render() {
    const { deck } = this.props
    return (
      <Wrapper>
        <View>
          <Text>{deck.title}</Text>
          <Text>{deck.questions.length} cards</Text>
        </View>
      </Wrapper>
    )
  }
}

function mapStateToProps(state, { id }) {
  const deck = state[id]

  return {
    deck,
  }
}

export default connect(mapStateToProps)(Deck)
