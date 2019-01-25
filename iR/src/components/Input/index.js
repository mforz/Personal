/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text,TextInput, View} from 'react-native';


class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  render() {
    //   const {} =this.state
    const {value,placeholder,style,onChange,textContentType,secureTextEntry,maxLength} = this.props

    return (
      <View style={styles.inputView}>
       <TextInput
          maxLength={maxLength}
          style={style?[styles.input,style]:styles.input}
          value={value}
          placeholder={placeholder}
          underlineColorAndroid='transparent'
          onChangeText={(text) => onChange(text)}
          textContentType={textContentType}
          secureTextEntry={secureTextEntry}
        />
      </View>
    );
  }
}

export default Input
const styles = StyleSheet.create({
    inputView:{
        margin:0,
        padding:0,
    },
    input:{
        backgroundColor: '#fff',
        fontSize: 14,
        padding:0,
        paddingLeft:10,
        height:30,
        width:'100%'
    }
});
