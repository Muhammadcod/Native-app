import React, { Component } from 'react'
import { View } from 'react-native-web'
import { Text, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { black, white, red } from '../utils/colors'

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
const CorrectButton = styled(Button)`
  border-color: tomato;
`
// A new component based on Button, but with some override styles
const IncorrectButton = styled(Button)`
  border-color: none;
`

const ButtonText = styled.Text`
  text-align: center;
  padding: 20px;
`

class QuizView extends Component {
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
          <Text>Where do you make Ajax requests in React?</Text>
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
              <ButtonText>Answer</ButtonText>
            </Button>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._onPressButton}>
            <CorrectButton primary>
              <ButtonText>Correct</ButtonText>
            </CorrectButton>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._onPressButton}>
            <IncorrectButton>
              <ButtonText>Incorrect</ButtonText>
            </IncorrectButton>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default QuizView
