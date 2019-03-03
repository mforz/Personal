
import React from 'react';
// import Route from '../../routers/'
import {getIP} from '../../static/public.js'
import { getFetch } from '../../static/fetch';
import API from '../../static/api';


/* eslint-disable */
class Weather extends React.Component{
    constructor(props){
        super(props);
        this.state={
            word:'人生百态',
        }
    }
    componentDidMount(){
        this.init()
        console.log(getIP())
    }
    init=()=>{
      getFetch(API.weather +'city=上海')
    }
    render(){
        // const { menu } = this.state
        return (
            <div className="weather">
              
            </div>
        )
    }

}
const styles ={
    home:{
        width:'100%',
        height:'100%',
        display:'flex'
    },
}

export default Weather