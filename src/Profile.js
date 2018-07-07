import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class Profile extends Component {
    static navigationOptions = {
        title: 'User profile',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View><Text>Alguito</Text></View>
        )
    }
}