
import React from 'react';
import Input from '@/components/Input/'
import {getCookie,getTime,setStorage,getStorage} from '@/static/public.js'
import API from '../../static/api';
import {getFetch,postFetch} from '@/static/fetch.js'
// import './index.css'
/* eslint-disable */

class Essay extends React.Component{
    constructor(props){
        super(props);
        this.state={
          
        }
    }
    componentDidMount(){
        let dom = document.getElementById('bg')
        let height= document.body.clientHeight-dom.clientHeight
        this.setState({
            height
        })
        this.init()
    }
    init=()=>{
        getFetch('https://www.liewen.cc/search.php?keyword=%s').then((res)=>{
            console.log(res)
        }).catch()
    }
   
    render(){
        const {data,height,date,list,menu,isExcerpt,excerpt} =this.state
        return (
            <div className="novel" style={{height:height,overflow:'hidden',}}>
              
            </div>
        )
    }
}
const styles={
    
}

export default Essay