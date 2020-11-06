import React, {Component} from 'react'
import {Text, View} from "react-native";
import {connect} from 'react-redux'
import {getDecks} from '../utils/api'
import { receiveDecks } from "../actions";


class Home extends Component {

    componentDidMount() {
        const {dispatch} = this.props;
        getDecks()
            .then((decks)=>dispatch(receiveDecks(decks)))

    }

    render() {
        const {decks} = this.props
        console.log('===',decks)

        return (
            <View>
                {Object.values(decks).map((deck) => {
                    console.log('+++',deck.title)

                })}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return{
        decks: state
    }
}

export default connect(mapStateToProps)(Home)
