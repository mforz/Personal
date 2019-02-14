
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
            <div className="color" style={styles.color}>
            {
               color.map((res,i)=>(
                   <div style={styles.list}>
                        <div>
                            <span style={{display:'inline-block',width:'25px',height:'25px',margin:'0 10px',backgroundColor:res}}></span>
                            <code>{res}</code>
                       </div>
                    </div>
               ))
            }
            </div>
        )
    }
}
const styles={
    color:{
        padding:'10%',
        overflow:'auto'
    },
    list:{
        width:'25%',
        float:'left',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    }
}

export default Color