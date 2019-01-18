
import React from 'react';
import Input from '@/components/Input/'
import CityCom from '@/components/City/'
import {getCookie,goTo,setStorage,getStorage} from '@/static/public.js'
import {getFetch} from '@/static/fetch.js'
import city from '@/static/city.js'
import API from '@/static/api.js'
import Message from '@/components/Message/'
/* eslint-disable */

class Weather extends React.Component{
    constructor(props){
        super(props);
        this.state={
            input:false,
            list:[],
            i:0,
            show:false,
        }
    }
    componentDidMount(){
        this.init()
    }
    init=()=>{
        getStorage('weather')?
        this.setState({
            list:getStorage('weather')
        }):
        getFetch(API.bdWeather+'/city=上海')
        .then(res=>res.json())
        .then(res=>{
            res.data.weather.content&&
            this.setState({
                list:res.data.weather.content
            },()=>setStorage('weather',res.data.weather.content))
            console.log(res.data.weather.content)
        }).catch(err => {
            this.setState({
                list:[]
            })
        })
    }
    changeCity=( flag,value )=>{

        let {list,show,input} = this.state

        switch (flag) {
            case 'show' :
                show=true
            break
            case 'input' :
                input=true
            break
            case 'city' :
                list.city = value
                show = false
                input = false
            break
            default:
                list.city = value.target.value
            break
        }
       
        this.setState({
            list,
            show,
            input
        })
    }

    saveCity=(e)=>{
        let {list} =this.state

        list.city = list.city?list.city.replace(/\s*/g,""):'上海'

        if(e.nativeEvent.keyCode==13){

           this.setState({
               input:false
           })
        }
    }
    render(){
        const {list,input,show} =this.state
        return (
            <div style={styles.weather}>
               <div style={styles.con}>
                <header style={styles.header}>
                    {
                        input?
                        <div>
                             <Input
                                sms
                                time={-1}
                                codeLabel="获取省市区"
                                value={list.city} 
                                width="300px"
                                placeholder="Enter保存"
                                style={{width:'100%'}} 
                                onChange={this.changeCity.bind(this,'null')}
                                onKeyPress={this.saveCity}
                                smsClick={this.changeCity.bind(this,'show')}
                            />
                            {
                                show?
                               <CityCom onChange={this.changeCity.bind(this,'city')} />
                               :''
                            }
                        </div>
                        :<h2 onClick={this.changeCity.bind(this,'input')} >{list.city}</h2>
                    }
                </header>
                <div>
                    <p>
                        今天是{list.week} , 实时温度 {list.currenttemp}
                    </p>
                    <div>
                        <div>
                            <label>今天</label>
                            {/* <div>{list['today'].link}</div> */}
                        </div>
                    </div>
                </div>
               </div>
            </div>
        )
    }
}

export default Weather

const styles = {
   weather:{
       width:'80%',
       margin:'0 auto',
   },
   con:{
       width:'100%',
       marginTop:'50px',
       textAlign:'center',
   },
   header:{

   }
}