import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { black, white, red } from '../utils/colors'

const Container = styled.View`
  flex: 1;
`
const DeckDetails = styled(Container)`
  justify-content: center;
  align-items: center;
`

const ButtonGrp = styled(DeckDetails)``

const Button = styled.View`
  background: ${(props) => (props.primary ? 'black' : 'white')};
  margin-bottom: 30px;
  width: 260px;
  align-items: center;
  border-radius: 3px;
`
const StartButton = styled(Button)`
  border-color: white;
`
const DeleteButton = styled(Button)`
  background: transparent;
`

const ButtonText = styled.Text`
  color: ${(props) => (props.primary ? 'white' : 'black')};
  text-align: center;
  padding: 20px;
`

const DeleteButtonText = styled(ButtonText)`
  color: red;
`

function DeckView(props) {
  const setTitle = (title) => {
    // if (!deck) return
    const { navigation } = props

    navigation.setOptions({
      title,
    })
  }

  const _onPressButton = () => {
    alert('You tapped the button!')
  }

  const { navigation, deck, title } = props

  useEffect(() => {
    setTitle(title)
  })

  return (
    <Container>
      <DeckDetails>
        <Text>{deck.title}</Text>
        <Text>{deck.questions.length} cards</Text>
      </DeckDetails>
      <ButtonGrp>
        <TouchableOpacity onPress={() => navigation.navigate('AddCard')}>
          <Button>
            <ButtonText>Add Card</ButtonText>
          </Button>
        </TouchableOpacity>
        <TouchableOpacity onPress={_onPressButton}>
          <StartButton primary>
            <ButtonText primary>Start Quiz</ButtonText>
          </StartButton>
        </TouchableOpacity>
        <TouchableOpacity onPress={_onPressButton}>
          <DeleteButton primary>
            <DeleteButtonText>Delete Deck</DeleteButtonText>
          </DeleteButton>
        </TouchableOpacity>
      </ButtonGrp>
    </Container>
  )
}

function mapStateToProps(state, { route }) {
  // https://reactnavigation.org/docs/params
  const { title } = route.params
  const deckId = state[title]

  return {
    deck: deckId,
    title,
  }
}
export default connect(mapStateToProps)(DeckView)
