
import React from 'react';
import API from '../../static/api';
import {getFetch} from '../../static/fetch.js'
import { setStorage,getStorage } from '../../static/public';

/* eslint-disable */
const _404 =require('../../assets/loading.gif')

class Novel extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentDidMount(){
        this.init()
    }
    init=()=>{
        getFetch(API.novel+'book/fuzzy-search?query=一念&start=0&limit=20').then(res=>{
            console.log(res)
            
        }).catch()
    }
    
    render(){
        
        return (
            <div className="novel" style={{height:'100%',overflow:'hidden'}}>
            book
            </div>
        )
    }
}
const styles={
   
    
  
}

export default Novel