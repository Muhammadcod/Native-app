import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import styled from 'styled-components/native'

// The Button from the last section without the interpolations
const Button = styled.View`
  background: ${(props) => (props.primary ? 'black' : 'white')};
  color: ${(props) => (props.primary ? 'white' : 'black')};

  margin-bottom: 30px;
  width: 260;
  align-items: center;
  border: 2px solid palevioletred;
  border-radius: 3px;
`

// A new component based on Button, but with some override styles
const StartButton = styled(Button)`
  border-color: tomato;
`
// A new component based on Button, but with some override styles
const DeleteButton = styled(Button)`
  border-color: none;
`

const ButtonText = styled.Text`
  text-align: center;
  padding: 20px;
`

class DeckCard extends Component {
  _onPressButton = () => {
    alert('You tapped the button!')
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, border: '1px solid black' }}>
          <Text>back</Text>
        </View>
        <View
          style={{ flex: 2, textAlign: 'center', border: '1px solid black' }}
        >
          <Text>title</Text>
          <Text>card</Text>
        </View>
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid black',
          }}
        >
          <TouchableOpacity onPress={this._onPressButton}>
            <Button>
              <ButtonText>Add Card</ButtonText>
            </Button>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._onPressButton}>
            <StartButton primary>
              <ButtonText>Start Quiz</ButtonText>
            </StartButton>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._onPressButton}>
            <DeleteButton>
              <ButtonText>Delete Deck</ButtonText>
            </DeleteButton>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default connect()(DeckCard)
