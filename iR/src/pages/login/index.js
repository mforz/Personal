/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet,Image, ActivityIndicator, Text,View} from 'react-native';

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
    this.state = {account: '',password:'',idCode:'',rdNum:'',loading:false,active:false};
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

  onChange=(flag,value)=>{

    let {account,password,rePassword,idCode,active} =this.state

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
      case 'active':
        active=!active
      break;
    }
    this.setState({
      account,
      password,
      rePassword,
      idCode,
      active
    })
  }
  
  render() {

    const {account,password,idCode,rdNum,loading,active} =this.state

    return (
      <View style={styles.login}>
        <View style={styles.top}></View>
        {/* 注册登录switch */}
        <View style={styles.switch}>
          <View style={styles.switchBtn}>
             <Button style={[styles.btnSwitch,active?styles.active:{}]} title="注册" onPress={()=>this.onChange('active')} />
          </View>
          <View style={styles.switchBtn}>
             <Button style={[styles.btnSwitch,!active?styles.active:{}]} title="登录" onPress={()=>this.onChange('active')} />
          </View>
        </View>
        {/* 输入处理 */}
        <View style={styles.inputBar}>
          <View style={styles.col}>
            <Input value={account} placeholder="请输入账户" />
          </View>
          <View style={styles.col}>
            <Input value={password} secureTextEntry={true} placeholder="请输入密码"/>
          </View>
          <View style={styles.col}>
            <Input />
          </View>
        </View>

        <View>
        </View>
      </View>
    );
  }
}

export default Login
const styles = StyleSheet.create({

  active:{
    backgroundColor:'#7CCD7C',
  },
  login:{
    flex:1,
    alignItems:'center',
  },
  top:{
    width:'100%',
    height:150,
    // marginTop:50,
    backgroundColor:'#ff4835',
    // transform:[{rotate:'8deg'}],
  },
  switch:{
    width:200,
    height:40,
    paddingLeft:8,
    paddingRight:8,
    marginTop:-42,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  switchBtn:{
    flex:1,
    height:30,
    backgroundColor:'#ddd',
  },
  btnSwitch:{
    width:'100%',
    height:'100%',
    alignItems:'center',
    justifyContent:'center',
  },
  inputBar:{
    marginTop:3,
    width:250,
    height:300,
    borderWidth:1,
    borderColor:'#ccc',
    borderRadius:5,

  },
  col:{
    width:200,
    height:40,
    marginTop:10,
    justifyContent:'center',
  },
  button:{
    width:100,
    alignItems:'center',
    color:'#fff',
    borderRadius:5
  },
});
