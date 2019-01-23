/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';

import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';


class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  render() {
    const {title,onPress,style,activeOpacity} = this.props

    return (
      <View>
            <TouchableOpacity
                activeOpacity={activeOpacity||0.8}
                style={style||styles.button}
                onPress={onPress}>
                {
                    title?<Text style={{color: style&&style.color? style.color :'#fff'}}>{title}</Text>
                    :this.props.children
                }
            </TouchableOpacity>
      </View>
    );
  }
}

export default Button
const styles = StyleSheet.create({
   
    button:{
        backgroundColor: '#fff',
        fontSize: 14,
        padding:0,
        paddingLeft:10,
        height:30,
        width:'100%'
    }
});
