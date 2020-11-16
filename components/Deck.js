import React from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components/native'
import { black, white, red } from '../utils/colors'

const Wrapper = styled.View`
  background: white;
  padding: 20px 10px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 15px;
`

const TitleText = styled.Text`
  font-size: 24px;
`

const CardText = styled.Text`
  font-size: 18px;
`

function Deck(props) {
  const { deck } = props
  return (
    <Wrapper>
      <View>
        <TitleText>{deck.title}</TitleText>
      </View>
      <View>
        <CardText>{deck.questions.length} cards</CardText>
      </View>
    </Wrapper>
  )
}

function mapStateToProps(state, { id }) {
  const deck = state[id]

  return {
    deck,
  }
}

export default connect(mapStateToProps)(Deck)
