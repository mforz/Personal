/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Dimensions, View} from 'react-native';
import Home from './src/pages/login/index.js'
import Orientation from 'react-native-orientation';

const {height,width,scale} =  Dimensions.get('window');

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  componentDidMount(){
    //alert(scale)
    // Orientation.unlockAllOrientations();
    // Orientation.lockToLandscape();

    //强制竖屏
    // Orientation.lockToPortrait();

  }
  render() {
    return (
      <View>
        <Home />
      </View>
    );
  }
}

