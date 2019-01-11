
import React from 'react';
import Input from '@/components/input/'
import './index.css'

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            account:'',
            password:''
        }
    }
    inputChange=(f,v)=>{
        f==='account'
        ?this.setState({
            account:v ? v.target.value: ''
        })
        :this.setState({
            password:v?v.target.value:''
        })
    }

    render(){
        return (
            <div className="login">
                <div className="input-model">

                    <div>
                        <Input label={'账户'} value={this.state.account} onChange={this.inputChange.bind(this,'account')}/>
                    </div>
                    <br />
                    <div>
                        <Input label={'口令'} type="password" value={this.state.password} onChange={this.inputChange.bind(this,'password')}/>
                    </div>

                    <div className="btn">
                        <span>登入</span>
                        <span>匿名</span>
                    </div>

                </div>
            </div>
        )
    }

}

export default Login