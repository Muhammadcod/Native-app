import React, { useState } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import { black, white, red } from '../utils/colors'
import { addCardToDeck } from '../actions'
import { addCardToDeckAsync } from '../utils/api'

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

function AddCard(props) {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const handleQuestionChange = (input) => {
    setQuestion(input)
  }
  const handleAnswerChange = (input) => {
    setAnswer(input)
  }

  const submit = () => {
    const { dispatch, navigation, deck } = props
    const { title } = deck

    const card = {
      question,
      answer,
    }

    dispatch(addCardToDeck(title, card))
    addCardToDeckAsync(title, card).then((r) => console.log(r))
    navigation.navigate('DeckView', { title })
    setQuestion('')
    setAnswer('')
  }

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ViewContainer>
          <Input
            style={{ height: 40 }}
            placeholder="Question"
            onChangeText={handleQuestionChange}
            defaultValue={question}
          />
          <Input
            style={{ height: 40 }}
            placeholder="Answer"
            onChangeText={handleAnswerChange}
            defaultValue={answer}
          />
        </ViewContainer>
        <ViewContainer style={{ flex: 1 }}>
          <TouchableOpacity onPress={submit}>
            <Button primary>
              <ButtonText primary>Submit</ButtonText>
            </Button>
          </TouchableOpacity>
        </ViewContainer>
      </KeyboardAvoidingView>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

function mapStateToProps(state, { route }) {
  const { title } = route.params
  const deck = state[title]

  return {
    deck,
  }
}

export default connect(mapStateToProps)(AddCard)
