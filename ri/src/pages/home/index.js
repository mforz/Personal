
import React from 'react';
// import Input from '@/components/Input/'
import {getCookie,goTo,setStorage,getStorage} from '@/static/public.js'

/* eslint-disable */

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            word:'人生百态',
        }
    }
    componentDidMount(){
       
    }
    init=()=>{
        
    }
    render(){
        const { word } = this.state
        return (
            <div className="home">

                <div style={styles.wordBar}>
                    <p>{ word }</p>
                </div>

            </div>
        )
    }

}
const styles ={
    wordBar:{
        width:'50%',
        height:'10px',
        fontSize:'15px',
        color:'#000',
        textAlign:'center',
        margin:'0 auto',
        marginTop:80,
    }
    
}

export default Home