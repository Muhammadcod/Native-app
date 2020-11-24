import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import { percentageCorrect } from '../utils/_DATA'
import { white, red, orange } from '../utils/colors'
import { setLocalNotification, clearLocalNotification } from '../utils/helpers'

const Container = styled.View`
  flex: 1;
  background: white;
`
const QuizWrapper = styled(View)`
  justify-content: center;
  align-items: center;
  flex: 2;
  padding: 0 20px;
`

const NoCardView = styled.View`
  justify-content: center;
  align-items: center;
  padding: 15px;
  flex: 1;
  background: white;
`
const NoCardText = styled.Text`
  font-size: 24px;
  text-align: center;
`

const Buttongroup = styled(QuizWrapper)`
  flex: 1;
  justify-content: flex-end;
`

const CorrectButton = styled(View)`
 background: ${(props) => (props.primary ? 'green' : orange)}
  margin-bottom: 20px;
  width: 260px;
  align-items: center;
  border-radius: 3px;
  
`

const IncorrectButton = styled(CorrectButton)`
  background: ${(props) => (props.primary ? 'black' : 'red')};
`

const ButtonText = styled.Text`
  color: ${(props) => (props.primary ? red : white)};
  text-align: center;
  padding: 20px;
`
const QuizText = styled.Text`
  color: ${(props) => (props.primary ? red : white)};
  text-align: center;
  font-size: 22px;
  padding: 5px;
`

class QuizView extends Component {
  state = {
    index: 0,
    isToggled: false,
    correctAnswer: 0,
    incorrectAnswer: 0,
    quizCompleted: false,
  }

  UNSAFE_componentWillMount() {
    // https://codedaily.io/tutorials/84/Create-a-Flip-Card-Animation-with-React-Native
    this.animatedValue = new Animated.Value(0)
    this.value = 0
    this.animatedValue.addListener(({ value }) => {
      this.value = value
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    })
  }

  flipCard = () => {
    // https://codedaily.io/tutorials/84/Create-a-Flip-Card-Animation-with-React-Native
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start()
    }
    this.setState({ isToggled: !this.state.isToggled })
  }

  handleSelection = (selectedAnswer) => {
    const { deck } = this.props
    const { questions } = deck
    const { index, correctAnswer, incorrectAnswer, isToggled } = this.state

    if (index + 1 === questions.length) {
      clearLocalNotification().then(setLocalNotification)
      this.setState({ quizCompleted: true })
      this.setState((prevState) => ({
        correctAnswer: selectedAnswer ? correctAnswer + 1 : correctAnswer,
        incorrectAnswer: !selectedAnswer
          ? incorrectAnswer + 1
          : incorrectAnswer,
      }))
    } else {
      this.setState((prevState) => ({
        index: prevState.index + 1,
        correctAnswer: selectedAnswer ? correctAnswer + 1 : correctAnswer,
        incorrectAnswer: !selectedAnswer
          ? incorrectAnswer + 1
          : incorrectAnswer,
      }))
      if (isToggled) {
        this.flipCard()
      }
    }
  }

  onReset = () => {
    this.setState({
      index: 0,
      correctAnswer: 0,
      incorrectAnswer: 0,
      quizCompleted: false,
    })
  }

  goBackToDeck = () => {
    const { navigation } = this.props

    navigation.goBack()
  }

  render() {
    // https://codedaily.io/tutorials/84/Create-a-Flip-Card-Animation-with-React-Native
    const frontAnimatedStyle = {
      transform: [{ rotateY: this.frontInterpolate }],
    }
    const backAnimatedStyle = {
      transform: [{ rotateY: this.backInterpolate }],
    }
    const { deck } = this.props
    const { index, quizCompleted, correctAnswer, incorrectAnswer } = this.state
    const current = deck.questions[index] //https://stackoverflow.com/questions/58144849/display-only-one-element-at-a-time-in-react-with-map

    const score = percentageCorrect(correctAnswer, deck.questions.length, 100)

    if (deck.questions.length === 0) {
      return (
        <Container>
          <NoCardView>
            <NoCardText>
              Sorry, you cannot take a quiz because there are no cards in this
              deck
            </NoCardText>
          </NoCardView>
        </Container>
      )
    }

    return (
      <Container>
        {!quizCompleted ? (
          <Container>
            <View>
              <Text>
                {index + 1}/{deck.questions.length}
              </Text>
            </View>
            <QuizWrapper>
              <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                <QuizText>{current.question}</QuizText>
              </Animated.View>
              <Animated.View
                style={[
                  backAnimatedStyle,
                  styles.flipCard,
                  styles.flipCardBack,
                ]}
              >
                <QuizText>{current.answer}</QuizText>
              </Animated.View>
            </QuizWrapper>
            <View>
              <ButtonText primary onPress={() => this.flipCard()}>
                {!this.state.isToggled ? 'Answer' : 'Question'}
              </ButtonText>
            </View>
            <Buttongroup>
              <TouchableOpacity onPress={() => this.handleSelection(true)}>
                <CorrectButton primary>
                  <ButtonText>Correct</ButtonText>
                </CorrectButton>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.handleSelection(false)}>
                <IncorrectButton>
                  <ButtonText>Incorrect</ButtonText>
                </IncorrectButton>
              </TouchableOpacity>
            </Buttongroup>
          </Container>
        ) : (
          <Container>
            <QuizWrapper>
              <QuizText primary>
                {score === 100
                  ? `Hurray! you have a ${score}%`
                  : score <= 50
                  ? ` ${score}% Below par but you can study and try  again`
                  : ` ${score}% Above average but you can study and try again`}
              </QuizText>
            </QuizWrapper>
            <Buttongroup>
              <TouchableOpacity onPress={this.onReset}>
                <CorrectButton>
                  <ButtonText>Restart Quiz</ButtonText>
                </CorrectButton>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.goBackToDeck}>
                <IncorrectButton primary>
                  <ButtonText>Back To Deck</ButtonText>
                </IncorrectButton>
              </TouchableOpacity>
            </Buttongroup>
          </Container>
        )}
      </Container>
    )
  }
}

function mapStateToProps(state, { route }) {
  // https://reactnavigation.org/docs/params
  const { title } = route.params
  const deck = state[title]

  return {
    deck,
  }
}

const styles = StyleSheet.create({
  flipCard: {
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    backfaceVisibility: 'hidden',
    borderRadius: 10,
  },
  flipCardBack: {
    backgroundColor: 'red',
    position: 'absolute',
  },
  flipText: {
    width: 90,
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
  },
})

export default connect(mapStateToProps)(QuizView)
