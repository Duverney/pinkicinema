import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
    Image,
    LayoutAnimation,
    PanResponder,
    TouchableHighlight,
} from 'react-native';

import { defaultStyles } from './styles';
import Options from './Options'

// Get screen dimensions
const { width, height } = Dimensions.get('window');
// Set default popup height to 67% of screen height
const defaultHeight = height * 0.67;

export default class MoviePopup extends Component {

    state = {
        //position: new Animated.Value(this.props.isOpen ? 0 : height),
        position: height,
        // height: height / 2,
        visible: this.props.isOpen,
        opacity: 0.5,
        // Popup height that can be changed by pulling it up or down
        height: defaultHeight,
        // Expanded mode with bigger poster flag
        expanded: false,
    };

    // When user starts pulling popup previous height gets stored here
    // to help us calculate new height value during and after pulling
    // Cuando el usuario comienza a tirar de la ventana emergente, la altura anterior se almacena aquí
    // para ayudarnos a calcular el nuevo valor de altura durante y después de tirar
    _previousHeight = 0


    componentWillMount() {
        // Initialize PanResponder to handle move gestures
        // Inicializar PanResponder para manejar gestos de movimiento
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                const { dx, dy } = gestureState;
                // Ignore taps
                // Ignorar toques
                if (dx !== 0 && dy === 0) {
                    return true;
                }
                return false;
            },
            onPanResponderGrant: (evt, gestureState) => {
                // Store previous height before user changed it
                // Almacene la altura anterior antes de que el usuario la cambie
                this._previousHeight = this.state.height;
            },
            onPanResponderMove: (evt, gestureState) => {
                // Pull delta and velocity values for y axis from gestureState
                // Tire delta y valores de velocidad para eje y de gestureState
                const { dy, vy } = gestureState;
                // Subtract delta y from previous height to get new height
                // Resta del delta y de la altura anterior para obtener una nueva altura
                let newHeight = this._previousHeight - dy;

                // Animate heigh change so it looks smooth
                // Anima el cambio de altura para que luzca suave
                //LayoutAnimation.easeInEaseOut();

                // Switch to expanded mode if popup pulled up above 80% mark
                // Cambie al modo expandido si la ventana emergente se detuvo por encima del 80%
                if (newHeight > height - height / 5) {
                    this.setState({ expanded: true });
                } else {
                    this.setState({ expanded: false });
                }

                // Expand to full height if pulled up rapidly
                // Expande hasta la altura completa si se levanta rápidamente
                if (vy < -0.75) {
                    this.setState({
                        expanded: true,
                        height: height
                    });
                }
                // Close if pulled down rapidly
                // Cerrar si se tira rápidamente
                else if (vy > 0.75) {
                    this.props.onClose('Hola');
                }
                // Close if pulled below 75% mark of default height
                // Cerrar si se tira por debajo de la marca del 75% de la altura predeterminada
                else if (newHeight < defaultHeight * 0.75) {
                    this.props.onClose('Hola');
                }
                // Limit max height to screen height
                // Limite la altura máxima a la altura de la pantalla
                else if (newHeight > height) {
                    this.setState({ height: height });
                }
                else {
                    this.setState({ height: newHeight });
                }
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                const { dy } = gestureState;
                const newHeight = this._previousHeight - dy;

                // Close if pulled below default height
                if (newHeight < defaultHeight) {
                    this.props.onClose('Hola');
                }

                // Update previous height
                this._previousHeight = this.state.height;
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // Returns whether this component should block native components from becoming the JS
                // responder. Returns true by default. Is currently only supported on android.
                return true;
            },
        });
    }

    // Handle isOpen changes to either open or close popup
    componentWillReceiveProps(nextProps) {
        // isOpen prop changed to true from false
        if (!this.props.isOpen && nextProps.isOpen) {
            this.animateOpen();
        }
        // isOpen prop changed to false from true
        else if (this.props.isOpen && !nextProps.isOpen) {
            this.animateClose();
        }
    }

    // Open popup
    animateOpen() {
        // Update state first
        this.setState({ visible: true, opacity: 0.5, position: 0 })
    }

    // Close popup
    animateClose() {
        this.setState({
            opacity: 0,
            position: height,
            height: defaultHeight,
            expanded: false,
            visible: false,
        })
    }

    // Dynamic styles that depend on state
    getStyles = () => {
        return {
            imageContainer: this.state.expanded ? {
                width: width / 2,         // half of screen widtj
            } : {
                    maxWidth: 110,            // limit width
                    marginRight: 10,
                },
            movieContainer: this.state.expanded ? {
                flexDirection: 'column',  // arrange image and movie info in a column
                alignItems: 'center',     // and center them
            } : {
                    flexDirection: 'row',     // arrange image and movie info in a row
                },
            movieInfo: this.state.expanded ? {
                flex: 0,
                alignItems: 'center',     // center horizontally
                paddingTop: 20,
            } : {
                    flex: 1,
                    justifyContent: 'center', // center vertically
                },
            title: this.state.expanded ? {
                textAlign: 'center',
            } : {},
        };
    }

    render() {
        const {
            movie,
            chosenDay,
            chosenTime,
            onChooseDay,
            onChooseTime,
            onBook
        } = this.props;

        // Pull out movie data - Extrae los datos de la película
        const { title, genre, poster, days, times } = movie || {};


        // Render nothing if not visible
        if (!this.state.visible) {
            return null;
        }
        return (
            <View style={styles.container}>
                {/* Closes popup if user taps on semi-transparent backdrop */}
                <TouchableWithoutFeedback onPress={this.props.onClose}>
                    <View style={[styles.backdrop, { opacity: this.state.opacity }]} />
                </TouchableWithoutFeedback>
                <View style={[styles.modal, { height: this.state.height }]}>

                    {/* Content */}
                    <View style={styles.content}>
                        {/* Movie poster, title and genre */}
                        <View style={[styles.movieContainer, this.getStyles().movieContainer]} {...this._panResponder.panHandlers}>
                            {/* Poster */}
                            <View style={[styles.imageContainer, this.getStyles().imageContainer]}>
                                <Image source={{ uri: poster }} style={styles.image} resizeMethod='resize' />
                            </View>
                            {/* Title and genre */}
                            <View style={[styles.movieInfo, this.getStyles().movieInfo]}>
                                <Text style={[styles.title, this.getStyles().title]}>{title}</Text>
                                <Text style={styles.genre}>{genre}</Text>
                            </View>
                        </View>
                        {/* Showtimes */}
                        <View>
                            {/* Day */}
                            <Text style={styles.sectionHeader}>Day</Text>
                            {/* TODO: Add day options here */}
                            <Options values={days} chosen={chosenDay} onChoose={onChooseDay}
                            />
                            {/* Time */}
                            <Text style={styles.sectionHeader}>Showtime</Text>
                            {/* TODO: Add show time options here */}
                            <Options values={times} chosen={chosenTime} onChoose={onChooseTime}
                            />
                        </View>
                        {/* Footer */}
                        <View style={styles.footer}>
                            <TouchableHighlight underlayColor="#9575CD" style={styles.buttonContainer} onPress={() => onBook('')}>
                                <Text style={styles.button}>Book My Tickets</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    // Main container
    container: {
        ...StyleSheet.absoluteFillObject,   // fill up all screen
        justifyContent: 'flex-end',         // align popup at the bottom
        backgroundColor: 'transparent',     // transparent background
    },
    // Semi-transparent background below popup
    backdrop: {
        ...StyleSheet.absoluteFillObject,   // fill up all screen
        backgroundColor: 'black',
    },
    // Popup
    modal: {
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        margin: 20,
        marginBottom: 0,
    },
    // Movie container
    movieContainer: {
        flex: 1,                            // take up all available space
        marginBottom: 20,
    },
    imageContainer: {
        flex: 1,                            // take up all available space
    },
    image: {
        borderRadius: 10,                   // rounded corners
        ...StyleSheet.absoluteFillObject,   // fill up all space in a container
    },
    movieInfo: {
        backgroundColor: 'transparent',     // looks nicier when switching to/from expanded mode
    },
    title: {
        ...defaultStyles.text,
        fontSize: 20,
    },
    genre: {
        ...defaultStyles.text,
        color: '#BBBBBB',
        fontSize: 14,
    },
    sectionHeader: {
        ...defaultStyles.text,
        color: '#AAAAAA',
    },
    // Footer
    footer: {
        padding: 20,
    },
    buttonContainer: {
        backgroundColor: '#673AB7',
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    button: {
        ...defaultStyles.text,
        color: '#FFFFFF',
        fontSize: 18,
    },
});

/**
 * return (
            <View style={styles.container}>
                {//
                    Closes popup if user taps on semi-transparent backdrop
                }
                <TouchableWithoutFeedback onPress={this.props.onClose}>
                    <Animated.View style={styles.backdrop} />
                </TouchableWithoutFeedback>
                <Animated.View
                    style={[styles.modal, {
                        // Animates position on the screen
                        transform: [{ translateY: this.state.position }, { translateX: 0 }]
                    }]}
                >
                    <Text>Popup</Text>
                </Animated.View>
            </View>
        );
 */