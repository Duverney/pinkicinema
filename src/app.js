import React, { Component } from 'react'

import Movies from './Movies'
import Profile from './Profile'
import { createStackNavigator } from 'react-navigation';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);


const App = createStackNavigator({
    Movies: { screen: Movies },
    Profile: { screen: Profile },
});

export default App;

/**
 * Sistema de rutas recomendado por React Ntaive ( https://facebook.github.io )
 * https://facebook.github.io/react-native/docs/navigation#react-navigation
 * npm install --save react-navigation
 * Para ejemplo, este proyecto (archivo app.js) y cada uno de los componentes creados
 */


//http://www.cinecalidad.to/pelicula/no-me-las-toquen-2018-online-descarga/