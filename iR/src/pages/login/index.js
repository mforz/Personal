/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet,Image, Text, View} from 'react-native';

import Input from '../../components/Input'
import Button from '../../components/Button'
import API from '../../static/api'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {account: '',password:'',idCode:'',rdNum:''};
  }
  componentDidMount(){
    this.changeIdCode()
  }
  changeIdCode=()=>{
    let rdNum = (new Date()).getTime() + Math.random()
    this.setState({
      rdNum,
      idCode:''
    })
  }

  inputChange=(flag,value)=>{

    let {account,password,rePassword,idCode} =this.state

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
      case 'idCode':
        idCode=value
      break;
    }
    this.setState({
      account,
      password,
      rePassword,
      idCode
    })
  }
  onPress=()=>{
    alert('smjdh')
  }
  render() {

    const {account,password,idCode,rdNum} =this.state

    return (
      <View style={{width:'100%',height:'100%',marginTop:150,alignItems:'center',}}>
          <View style={styles.col}>
            <Input
              value={account}
              maxLength={12}
              placeholder="请输入账号"
              onChangeText={(v)=>this.inputChange('account',v)}
            />
          </View>
          <View style={styles.col}>
            <Input
              value={password}
              maxLength={24}
              placeholder="请输入密码"
              onChangeText={(v)=>this.inputChange('password',v)}
              secureTextEntry={true}
            />
          </View>

          <View style={[styles.col,{alignItems:'center', flexDirection: 'row'}]}>

            <View style={{flex:0.6}}>
              <Input
                value={idCode}
                maxLength={6}
                placeholder="请输入验证码"
                onChangeText={(v)=>this.inputChange('idCode',v)}
              />
            </View>

            <View style={{flex:0.4,alignItems:'flex-end'}}>
              <Button style={{justifyContent:'center'}} 
                      onPress={this.changeIdCode}
                      activeOpacity={1}
                      >
                  <Image source={{uri: API.idCode + rdNum}}
                        style={{width:60,height: 20}} />
              </Button>
            </View>
           
          </View>

          <View style={{marginTop:20}}>
            <View style={{width:150,height:10,justifyContent:'center',alignItems:'center',margin:10}}>
              <Button title="登录" style={{backgroundColor:'#8FBC8F',alignItems:'center',color:'#fff',borderRadius:5}} onPress={()=>alert('sjh')}/>
            </View>

            <View style={{width:150,height:10,justifyContent:'center',alignItems:'center',margin:10}}>
              <Button title="注册®️" style={{width:100,backgroundColor:'#EEE5DE',alignItems:'center',color:'#fff',borderRadius:5}} onPress={()=>alert('sjh')}/>
            </View>
            
          </View>

      </View>
    );
  }
}

export default Login
const styles = StyleSheet.create({
  col:{
    width:200,
    marginTop:10,
    justifyContent:'center',
  },
  button:{
    width:100,
    alignItems:'center',
    color:'#fff',
    borderRadius:5
  }
});
