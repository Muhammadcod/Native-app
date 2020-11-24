import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
} from 'react-native'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import { black, white, purple } from '../utils/colors'
import { addDeck } from '../actions'
import { saveDeckTitle } from '../utils/api'

const Container = styled.View`
  flex: 1;
  background: white;
`
const InputField = styled(Container)`
  flex: 2;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`
const HeadlineText = styled.Text`
  font-size: 30px;
  text-align: center;
  margin-bottom: 20px;
`
const ButtonContainer = styled(Container)`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`
const Button = styled.View`
  background: ${(props) => (props.primary ? 'black' : 'white')};
  margin-bottom: 30px;
  width: 260px;
  border-radius: 15px;
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
  padding: 0 15px;
  background: white;
  border: 1px solid black;
  border-radius: 3px;
`

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={
        Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn
      }
      onPress={onPress}
    >
      <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}
class AddDeck extends Component {
  state = {
    title: '',
  }

  handleChange = (title) => {
    this.setState({ title })
  }
  submit = () => {
    const { title } = this.state
    const { dispatch, navigation } = this.props

    dispatch(addDeck(title))
    saveDeckTitle(title)
    navigation.navigate('DeckView', { title: title })

    this.setState({ title: '' })
  }

  toDeck = () => {}

  render() {
    const { title } = this.state
    return (
      <Container>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <InputField>
            <HeadlineText>What is the title of your new deck?</HeadlineText>
            <Input
              style={{ height: 40 }}
              placeholder="Deck Title"
              onChangeText={this.handleChange}
              defaultValue={title}
            />
          </InputField>
          <ButtonContainer>
            <TouchableOpacity
              disabled={this.state.title === ''}
              onPress={this.submit}
            >
              <Button primary>
                <ButtonText primary>Create Deck</ButtonText>
              </Button>
            </TouchableOpacity>
          </ButtonContainer>
        </KeyboardAvoidingView>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    decks: state,
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
})

export default connect(mapStateToProps)(AddDeck)
