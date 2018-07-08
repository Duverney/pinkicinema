import React, { Component } from 'react'
import { Platform } from 'react-native'
import Movies from './Movies'
import Confirmation from './Confirmation'
import Profile from './Profile'

import { Router, Scene } from 'react-native-router-flux'

//import { createStackNavigator } from 'react-navigation';
//import { YellowBox } from 'react-native';

//YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);


/*const App = createStackNavigator({
    Movies: { screen: Movies },
    Confirmation: { screen: Confirmation },
});
export default App;*/

export default class Routes extends Component {
    render() {
        return (
            <Router uriPrefix={'pinkicinema'}>
                <Scene key="root" hideNavBar>
                    <Scene key='Movies' component={Movies} title='Peliculas very well' hideNavBar />
                    <Scene key='Confirmation' component={Confirmation} title='Código de confirmación' hideNavBar={Platform.OS === 'ios' ? false : true} />
                    <Scene key='Profile' component={Profile} title='Información personal' hideNavBar={Platform.OS === 'ios' ? false : true} />
                </Scene>
            </Router>
        );
    }
}




/**
 * Sistema de rutas recomendado por React Ntaive ( https://facebook.github.io )
 * https://facebook.github.io/react-native/docs/navigation#react-navigation
 * npm install --save react-navigation
 * Para ejemplo, este proyecto (archivo app.js) y cada uno de los componentes creados
 */
//http://www.cinecalidad.to/pelicula/no-me-las-toquen-2018-online-descarga/

/**
 * Utilizado y recomendado
 * 
 * npm install react-native-router-flux --save
 */