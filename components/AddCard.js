import React from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components/native'
import { black, white, red } from '../utils/colors'

const Container = styled.View`
  flex: 1;
`

const ViewContainer = styled(Container)`
  justify-content: center;
  align-items: center;
`

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

const Input = styled.TextInput`
  border: 1px solid black;
  margin-bottom: 20px;
  width: 350px;
  background: white;
  border: 1px solid black;
  border-radius: 3px;
`

function AddCard() {
  const _onPressButton = () => {
    alert('You tapped the button!')
  }

  return (
    <Container>
      <ViewContainer>
        <Input
          style={{ height: 40 }}
          placeholder="Question"
          // onChangeText=""
          defaultValue=""
        />
        <Input
          style={{ height: 40 }}
          placeholder="Answer"
          // onChangeText=""
          defaultValue=""
        />
      </ViewContainer>
      <ViewContainer style={{ flex: 1 }}>
        <TouchableOpacity onPress={_onPressButton}>
          <Button primary>
            <ButtonText primary>Submit</ButtonText>
          </Button>
        </TouchableOpacity>
      </ViewContainer>
    </Container>
  )
}

export default AddCard
