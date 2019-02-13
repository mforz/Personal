
import React from 'react';
// import Input from '@/components/Input/'
import {color,goTo,setStorage,getStorage} from '@/static/public.js'

/* eslint-disable */

class Color extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }
    componentDidMount(){
        console.log(color)
       
    }
    init=()=>{
        
    }
    render(){
        return (
            <div className="color">
            {
               color.map((res,i)=>(
                   <span style={{display:'inline-block',width:'33.333%',textAlign:'center'}}>
                       <span style={{display:'inline-block',width:'20px',height:'20px',backgroundColor:res}}></span>
                       <a>{res}</a>
                    </span>
               ))
            }
               
            </div>
        )
    }

}

export default Color