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
import { black, white, green, red, lightPurp } from '../utils/colors'

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
const Buttongroup = styled(QuizWrapper)`
  flex: 1;
  justify-content: flex-end;
`

const CorrectButton = styled(View)`
  background: ${(props) => (props.primary ? green : 'white')};
  margin-bottom: 20px;
  width: 260px;
  align-items: center;
  border-radius: 3px;
`

const IncorrectButton = styled(CorrectButton)`
  background: ${(props) => (props.primary ? 'white' : red)};
`

const ButtonText = styled.Text`
  color: ${(props) => (props.primary ? red : white)};
  text-align: center;
  padding: 20px;
`
const QuizText = styled.Text`
  color: ${(props) => (props.primary ? red : white)};
  text-align: center;
`

class QuizView extends Component {
  state = {
    index: 0,
    isToggled: false,
    correctlyAnswered: 0,
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

  onPressButton = (selectedAnswerStatus) => {
    const { deck } = this.props
    const { questions } = deck
    const { index, correctlyAnswered, isToggled } = this.state

    if (index + 1 === questions.length) {
      this.setState((prevState) => ({ quizCompleted: true }))
    } else {
      this.setState((prevState) => ({
        index: prevState.index + 1,
        correctlyAnswered: selectedAnswerStatus
          ? correctlyAnswered + 1
          : correctlyAnswered,
      }))
      if (isToggled) {
        this.flipCard()
      }
    }
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
    const { index, quizCompleted, correctlyAnswered } = this.state
    const current = deck.questions[index] //https://stackoverflow.com/questions/58144849/display-only-one-element-at-a-time-in-react-with-map

    return (
      <Container>
        {!quizCompleted ? (
          <>
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
              <QuizText primary onPress={() => this.flipCard()}>
                {!this.state.isToggled ? 'Answer' : 'Question'}
              </QuizText>
            </View>
            <Buttongroup>
              <TouchableOpacity onPress={() => this.onPressButton(true)}>
                <CorrectButton primary>
                  <ButtonText>Correct</ButtonText>
                </CorrectButton>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onPressButton(false)}>
                <IncorrectButton>
                  <ButtonText>Incorrect</ButtonText>
                </IncorrectButton>
              </TouchableOpacity>
            </Buttongroup>
          </>
        ) : (
          <View>
            <Text>test complete {correctlyAnswered + 1}</Text>
          </View>
        )}
      </Container>
    )
  }
}
function mapStateToProps(state, { route }) {
  // https://reactnavigation.org/docs/params
  const { title } = route.params
  const deck = state[title]
  console.log('===', deck)

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
