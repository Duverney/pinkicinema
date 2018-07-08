import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    Button
} from 'react-native';
import { movies } from './data';
import MoviePoster from './MoviePoster'
import MoviePopup from './MoviePopup'

import { Actions } from 'react-native-router-flux'

export default class Movies extends Component {

    // Add starting here
    state = {
        popupIsOpen: false,
        pelis: null,
        popupIsOpen: false,
        // Day chosen by user - Día elegido por el usuario
        chosenDay: 0,       // choose first day by default
        // Time chosen by user - Hora elegida por el susuario
        chosenTime: null,
    }

    static navigationOptions = {
        title: 'Movies',
    };

    openMovie = (movie) => {
        this.setState({
            popupIsOpen: true,
            movie,
        });
    }

    closeMovie = () => {
        this.setState({
            popupIsOpen: false,
            // Reset values to default ones - Establece los valores por defecto, el primer día y una hora null!
            chosenDay: 0,
            chosenTime: null,
        });
    }

    chooseDay = (day) => {
        this.setState({
            chosenDay: day,
        });
    }

    chooseTime = (time) => {
        this.setState({
            chosenTime: time,
        });
    }

    bookTicket = () => {
        // Make sure they selected time 
        if (!this.state.chosenTime) {
            alert('Please select show time');
        } else {
            // Close popup
            this.closeMovie();
            // Navigate away to Confirmation route
            // Generate random string
            //navigate('Confirmation', { code: Math.random().toString(36).substring(6).toUpperCase() })
            Actions.Confirmation({ code: Math.random().toString(36).substring(6).toUpperCase() })
            
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    {movies.map((movie, index) => <MoviePoster
                        movie={movie}
                        onOpen={this.openMovie}
                        key={index}
                    />)}
                </ScrollView>
                <MoviePopup
                    movie={this.state.movie}
                    isOpen={this.state.popupIsOpen}
                    onClose={this.closeMovie}
                    chosenDay={this.state.chosenDay}
                    chosenTime={this.state.chosenTime}
                    onChooseDay={this.chooseDay}
                    onChooseTime={this.chooseTime}
                    onBook={this.bookTicket}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,         // start below status bar
    },
    scrollContent: {
        flexDirection: 'row',   // arrange posters in rows
        flexWrap: 'wrap',       // allow multiple rows
    },
});

/**
 * <Button
        title="Go to Jane's profile"
        onPress={() =>
            navigate('Profile', { name: 'Jane' })
        }
    />
 */

 // keytool -genkey -v -keystore pinkicinema.keystore -alias pinkicinema-key-alias -keyalg RSA -keysize 2048 -validity 10000
 // Contraseña: Bandon2012