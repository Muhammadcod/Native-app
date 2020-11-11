import React, { Component } from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components/native'
import { black, white, red } from '../utils/colors'

const Button = styled.View`
  background: ${(props) => (props.primary ? 'black' : 'white')};
  margin-bottom: 30px;
  width: 260px;
  align-items: center;
  border-radius: 3px;
`

const ButtonText = styled.Text`
  color: ${(props) => (props.primary ? 'white' : 'black')};
  text-align: center;
  padding: 20px;
`

class AddCard extends Component {
  _onPressButton = () => {
    alert('You tapped the button!')
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <TextInput
            style={{ height: 40 }}
            placeholder="Type here to translate!"
            // onChangeText=""
            defaultValue=""
          />
          <TextInput
            style={{ height: 40 }}
            placeholder="Type here to translate!"
            // onChangeText=""
            defaultValue=""
          />
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={this._onPressButton}>
            <Button primary>
              <ButtonText primary>Submit</ButtonText>
            </Button>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default AddCard
