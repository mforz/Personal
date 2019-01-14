
import React from 'react';
import Input from '@/components/input/'
import {getCookie,goTo,setStorage,getStorage} from '@/static/public.js'
import {msg} from '@/components/message/'
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
        }
    }
    componentDidMount(){
        let arr=['success','ok'],isLogin = getCookie('isLogin')
        getStorage('id') ? '' : setStorage('id', ((Math.random() + 1) * Math.pow(10, 5)).toFixed(6))
        arr.indexOf(isLogin)===-1?goTo('/login'):''

        this.init()
    }
    init=()=>{
        msg()
    }
    render(){
        return (
            <div className="home">
                hello home
                {/* <Message type="success" con="message" /> */}
            {/* <Input /> */}
            </div>
        )
    }

}

export default Home