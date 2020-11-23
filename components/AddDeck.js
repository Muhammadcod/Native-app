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
import { black, white } from '../utils/colors'
import { addDeck } from '../actions'
import { saveDeckTitle } from '../utils/api'

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

/*function SubmitBtn ({ onPress }) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>SUBMIT</Text>
        </TouchableOpacity>
    )
}*/
class AddDeck extends Component {
  state = {
    title: '',
  }

  handleChange = (title) => {
    console.log('+++', title)
    this.setState({ title })
  }
  submit = () => {
    const { title } = this.state
    const { dispatch, navigation } = this.props
    console.log('aaa', title)

    dispatch(addDeck(title))
    saveDeckTitle(title)
    navigation.navigate('DeckView', { title: title })

    this.setState({ title: '' })
  }

  toDeck = () => {}

  render() {
    const { title } = this.state
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <View
            style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text>What is the title of your new deck?</Text>
            <Input
              style={{ height: 40 }}
              placeholder="Deck Title"
              onChangeText={this.handleChange}
              defaultValue={title}
            />
          </View>
          <View
            style={{
              flex: 2,
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px solid black',
            }}
          >
            <TouchableOpacity onPress={this.submit}>
              <Button primary>
                <ButtonText primary>Create Deck</ButtonText>
              </Button>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
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
})

export default connect(mapStateToProps)(AddDeck)
