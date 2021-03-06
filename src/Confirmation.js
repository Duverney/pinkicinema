import React, { Component } from 'React'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import { defaultStyles } from './styles';
import { Actions } from 'react-native-router-flux'

export default class Confirmation extends Component {

    //static propTypes = {
    //code: PropTypes.string.isRequired,
    //}
    static navigationOptions = {
        title: 'Confirmation',
    };

    render() {
        const { code } = this.props;
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Your confirmation code</Text>
                <Text style={styles.code}>{code}</Text>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    // Go back when pressed
                    onPress={() => Actions.pop()}
                >
                    <Text style={styles.button}>Done</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        ...defaultStyles.text,
        color: '#333',
        fontSize: 20,
    },
    code: {
        ...defaultStyles.text,
        color: '#333',
        fontSize: 36,
    },
    buttonContainer: {
        alignItems: 'center',
        backgroundColor: '#673AB7',
        borderRadius: 100,
        margin: 20,
        paddingVertical: 10,
        paddingHorizontal: 30,
    },
    button: {
        ...defaultStyles.text,
        color: '#FFFFFF',
        fontSize: 18,
    },
});