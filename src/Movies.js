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

export default class Movies extends Component {

    // Add starting here
    state = {
        popupIsOpen: false,
        movie: null
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
        });
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