
import React from 'react';
import Input from '@/components/Input/'
import {hex_md5} from '@/static/md5.js'
import {setCookie,goTo,getStorage,setStorage} from '@/static/public.js'
import {postFetch} from '@/static/fetch.js'
import API from '@/static/api.js'
import './index.css'
import Message from '../../components/Message';

/* eslint-disable */
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            account:'',
            password:'',
            code:'',
            rdCode:'',
        }
    }
    componentDidMount(){
        getStorage('deviceId') ? '': 
        setStorage('deviceId', ((Math.random() + 1) * Math.pow(10, 5)).toFixed(6))

        this.codeChange()
    }
    inputChange=(f,v)=>{
        f==='account'
        ?this.setState({
            account:v ? v.target.value: ''
        }):
        f==='password'
        ?this.setState({
            password: v ? v.target.value : ''
        })
        :this.setState({
            code: v ? v.target.value : ''
        })
    }
    //图形码
    codeChange=()=>{
        let rd = (new Date()).getTime() + Math.random()
        this.setState({
            rdCode:rd
        })
    }
    //验证图形码
    checkCode = ()=>{
        const {code,rdCode} =this.state
        let data={
            code: code,
            key: rdCode
        }
        this.setState({code:''}
        ,()=>this.codeChange())

        return postFetch(API.checkCode, data)
        .then(res => res.json())
    }
    //手机验证码
    smsCode=()=>{
        const {code,rdCode,account} =this.state
        let data = {
            picCode: code,
            key: rdCode,
            mobile:account
        }
        postFetch(API.smsCode, data)
            .then(res => res.json())
            .then(res => {
                console.log(res)
            })
    }
     //注册
     register = () => {
         
        const {password,account} =this.state
        let psw = hex_md5(account)
        ,reg={
            code:password,
            mobile:account,
            pwd:psw,
         }
        this.checkCode()
        .then(res => {
            res.msg==='success'
            ?postFetch(API.register, reg)
            .then(res => res.json())
            .then(res => {
                res.msg === 'success'
                ?console.log('注册成功')
                :console.log('注册失败')
            }):''
        })
     }
     //匿名
    set=()=>{
        setCookie('isLogin','ok')
        goTo('/')
    }
    //登入
    send=()=>{
        const {account,code,password} = this.state
        if (!code || !password) {
            Message.show('error','请输入账户、密码、验证码')
            return
        }
        this.checkCode()
        .then(res=>{
            let info={
                deviceId: getStorage('deviceId') || '000000',
                deviceName:'web',
                mobile:account,
                pwd: hex_md5(password)
            }
            res.msg=='success'?
            postFetch(API.checkLogin, info)
            .then(res=>res.json())
            .then(res=>{
                res.msg=='success'?(
                setCookie('isLogin','success'),
                setCookie('uid',res.data.uid),
                setCookie('token',res.data.token)
                )
                :''
                this.setState({
                    password:''
                })
            }):''
        })
    }
    render(){
        return (
            <div className="login">
                <div className="input-model">
                    <div>
                        <Input 
                            clear
                            label={'账户'}
                            maxlength="20"
                            value={this.state.account} 
                            placeholder = "用户名/手机号"
                            onChange={this.inputChange.bind(this,'account')}
                        />
                    </div>
                    <br />
                    <div>
                        <Input
                        clear
                        label={'验证'}
                        maxlength = "6"
                        placeholder = "图形验证"
                        value={this.state.code}
                        codeChange={this.codeChange}
                        onChange={this.inputChange.bind(this,'code')}
                        code={'https://api.it120.cc/mforz/verification/pic/get?key='+this.state.rdCode}
                        />
                    </div>
                    < br />
                    <div>
                        <Input
                            clear
                            sms
                            label={'口令'} 
                            maxlength = "20"
                            type="password"
                            placeholder="密码/验证码"
                            smsClick={ this.smsCode }
                            value={this.state.password}
                            onChange={this.inputChange.bind(this,'password')}
                        />
                    </div>
                    < br />

                    <div className="btn">
                        <span style={{color:'#C1CDC1'}} onClick={this.set}>匿名</span>
                        <span style={{color:'#A2CD5A'}} onClick={this.register}>注册</span>
                        <span style={{color:'#79594b'}} onClick={this.send}>登入</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login