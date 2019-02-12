
import React from 'react';
// import Input from '@/components/Input/'
import {getCookie,goTo,setStorage,getStorage} from '@/static/public.js'

/* eslint-disable */

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            word:'',
        }
    }
    componentDidMount(){
        
       
    }
    init=()=>{
        
    }
    render(){
        return (
            <div className="home">

                <div>
                    
                    人生百态
                    
                </div>

            </div>
        )
    }

}
const styles ={
    
}

export default Home