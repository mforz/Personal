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

    let {account,password,rePassword,idCode,active,rdNum} =this.state

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
        account='',
        password='',
        rePassword='',
        idCode=''
      break;
      case 'rdNum':
        rdNum = (new Date()).getTime() + Math.random()
        idCode=''
      break;
    }
    this.setState({
      account,
      password,
      rePassword,
      idCode,
      active,
      rdNum,
    })
  }
  onPress=()=>{
    alert('you click me')
  }
  render() {
    const {account,password,rePassword,idCode,rdNum,loading,active} =this.state
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
            <Input 
              value={account} 
              onChange={(v)=>this.onChange('account',v)} 
              placeholder="请输入账户"
              maxLength={20}
            />
          </View>

          <View style={styles.col}>
            <Input 
              value={password} 
              secureTextEntry={true} 
              onChange={(v)=>this.onChange('password',v)} 
              placeholder="请输入密码"
              maxLength={16}
            />
          </View>

          {
            active?(
               <View style={styles.col}>
                  <Input 
                    value={rePassword} 
                    secureTextEntry={true} 
                    onChange={(v)=>this.onChange('rePassword',v)} 
                    placeholder="请再次输入密码"
                    maxLength={16}
                  />
                </View>
            ):null
          }
          <View style={[styles.col,{flexDirection:'row',alignItems:'center'}]}>
            <View style={{flex:0.65}} >
              <Input 
                style={{width:'100%',}} 
                value={idCode} 
                onChange={(v)=>this.onChange('idCode',v)} 
                placeholder="请输入验证码"
                maxLength={6}
              />
            </View>
            <View style={{flex:0.35}}>
              <Button onPress={()=>this.onChange('rdNum')} activeOpacity={1} style={{justifyContent:'center'}}>
                <Image style={{width:'100%',height:25}} source={{uri:API.idCode+rdNum}}/>
              </Button>
            </View>
          </View>

          <View style={styles.col}>
            <Button style={[styles.btnSwitch,{height:30},active?{backgroundColor:'#ff4835'}:{backgroundColor:'#7CCD7C'}]} 
                  title={active?'注册':'登录'} 
                  onPress={this.onPress}/>
          </View>
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
    alignItems:'center',
  },
  col:{
    width:200,
    height:40,
    marginTop:10,
    justifyContent:'center',
  },
  button:{
    width:100,
    height:30,
    alignItems:'center',
    color:'#000',
    borderRadius:5
  },
});
