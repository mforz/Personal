/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, WebView,TouchableOpacity, Text, View} from 'react-native';

import Input from '../../components/Input'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {account: '',password:''};
  }

  inputChange=(flag,value)=>{
    let {account,password,rePassword} =this.state
    switch(flag){
      case 'account':
        account=value
      break;
      case 'password':
        password=value
      break;
      case 'rePassword':
        rePassword=value
      break;
    }
    this.setState({
      account,
      password,
      rePassword
    })
  }
  onPress=()=>{
    alert('smjdh')
  }
  render() {

    const {account,password} =this.state

    return (
      <View style={{width:'100%',height:'100%',margin:20,alignItems:'center',justifyContent:'center'}}>
          <WebView />
      </View>
    );
  }
}

export default Login
const styles = StyleSheet.create({

});
