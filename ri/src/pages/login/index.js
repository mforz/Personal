
import React from 'react';
import Input from '@/components/input/'
import {hex_md5} from '@/static/md5.js'
import {setCookie,goTo,getStorage,setStorage} from '@/static/public.js'
import {postFetch} from '@/static/fetch.js'
import API from '@/static/api.js'
import './index.css'

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
        getStorage('deviceId') ? ''
        : setStorage('deviceId', ((Math.random() + 1) * Math.pow(10, 5)).toFixed(6))

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
    checkCode = ()=>{
        let data={
            code: this.state.code,
            key: this.state.rdCode
        }

        this.setState({code:''}
        ,()=>this.codeChange())

        return postFetch(API.checkCode, data)
        .then(res => res.json())
    }
    //手机验证码
    smsCode=()=>{
        let data = {
            picCode: this.state.code,
            key: this.state.rdCode,
            mobile:this.state.account
        }
        this.checkCode()
        .then(res=>{
            res.msg=='success'
            ?postFetch(API.smsCode, data)
            .then(res => res.json())
            .then(res => {
                console.log(res)
            }):''
        })
        
    }
     //注册
     register = () => {
        let psw = hex_md5(this.state.account)
        ,reg={
            code:this.state.password,
            mobile: this.state.account,
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
                console.log('login',res)
                res.msg='success'?(
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
                         code={this.state.rdCode} 
                         value={this.state.code}
                         placeholder = "图形验证"
                         onChange={this.inputChange.bind(this,'code')}
                         style={{width:'45%'}}
                         codeChange={this.codeChange}
                         />
                    </div>
                    < br />
                    <div>
                        <Input 
                            label={'口令'} 
                            clear
                            sms
                            maxlength = "20"
                            type="password"
                            style={{width:'45%'}}
                            value={this.state.password}
                            placeholder="密码/验证码"
                            onChange={this.inputChange.bind(this,'password')}
                            smsClick={this.smsCode}
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