
import React from 'react';
// import Input from '@/components/Input/'
import {getCookie,goTo,setStorage,getStorage} from '@/static/public.js'
import Message from '@/components/Message/'
/* eslint-disable */

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }
    componentDidMount(){
        
        ! getStorage('id') && setStorage('id', ((Math.random() + 1) * Math.pow(10, 5)).toFixed(6) )

        ['success','ok'].indexOf(getCookie('isLogin'))===-1 && goTo('/login')

        this.init()
    }
    init=()=>{
        Message.show('success','hello! welcome to home')
    }
    render(){
        return (
            <div className="home">
                hello home
            </div>
        )
    }

}

export default Home