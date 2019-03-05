
import React from 'react';
// import Route from '../../routers/'
import {scriptLoad, setStorage, getStorage,Sleep} from '../../static/public.js'
import { getFetch } from '../../static/fetch';
import API from '../../static/api';

const sleep = new Sleep()

/* eslint-disable */
class Weather extends React.Component{
    constructor(props){
        super(props);
        this.state={
            weather:[],
            today:{},
            fresh:true
        }
    }
    componentDidMount(){
        let weather = getStorage('weather')
        if( weather ){
            this.setState({
                weather
            })
        }
        scriptLoad('pv','http://pv.sohu.com/cityjson?ie=utf-8',this.init)
    }
    init=()=>{
        console.log('333')
        let city = ''
        if(returnCitySN){
            let name = returnCitySN.cname
            city = name.slice(0, name.split('').length-1)
        }
        getFetch(API.weather +'city='+city).then((res)=>{
            this.getData(res)

        }).catch(err=>{
            console.log(err)
        })
    }
    getData=(res)=>{
        if(res){
            let w = res.data.weather.content||{}
            let weather =[ w.today, w.tomorrow, w.thirdday, w.fourthday, w.fifthday ]
            let today = {
                week: w.week,
                city: w.city+'：',
                img:w.today.img[0],
                temp: '温度：'+w.currenttemp,
                lunar:!!w.calendar? '农历：'+ w.calendar.lunar:'',
                pslink:w.pslink,
                pm25: 'pm25：'+w.today.pm25
            }
            this.setState({
                weather,
                today
            },()=>{
                setStorage('weather',weather)
            })
        }
    }
    refresh= (e)=>{
        sleep.wait(()=>{
            e.persist()
            e.target.className = "fa fa-refresh fa-spin"
            scriptLoad('pv','http://pv.sohu.com/cityjson?ie=utf-8',this.init)

            let x = setTimeout(()=>{
                e.target.className = "fa fa-refresh"
                clearTimeout(x)
            },2500)

        },2500)
    }
    render(){
        const { weather,today } = this.state
        return (
            <div className="weather" style={{width:'100%',height:'100%',overflow:'hidden'}}>

                <div style={{width:'95%',margin:'50px auto'}}>
                    <div style={{width:'60%',padding:'5px',margin:'0 auto',}}>
                    {
                        today.city&&
                        <p style={{fontSize:'13px',textDecoration:'underline'}}>
                            <span>{today.city}</span>
                            <span>{today.week}&nbsp; &nbsp; &nbsp;,</span>
                            <span>{today.lunar}&nbsp; &nbsp; &nbsp;,</span>
                            <span>{today.temp}&nbsp; &nbsp; &nbsp;,</span>
                            <span>{today.pm25}</span>&nbsp; &nbsp; &nbsp;
                            <i className="fa fa-refresh" onClick={(e)=>{this.refresh(e)}}></i>
                        </p>
                    }
                    </div>
                </div>

                <div style={{display:'flex',width:'95%',margin:'0 auto'}}>
                    {
                        weather.map((res,i)=>(
                            <div key={i} style={styles.weatherItem}>
                                <p style={{fontSize:'13px',flex:1}}>
                                    {i==0&&<span style={{color:'#a5c6c7'}}> 今天 </span>}
                                    {i==1&&<span style={{color:'#e5b6b7'}}> 明天 </span>}
                                    {i==2&&<span style={{color:'#e5a6a7'}}> 后天 </span>}
                                    <span> {res.date} </span>
                                    <span> ({res.time.slice(0,2)}) </span>
                                </p>
                                <p style={{flex:1}}>
                                    <img style={{width:'50px'}} src={res.img[0]} />
                                </p>
                                <p style={{flex:1,fontSize:'13px'}}>
                                    <span>{res.temp}</span><br/>
                                    <span>{res.condition}</span><br/>
                                    <span>{res.wind}</span>
                                </p>
                            </div>
                        ))
                    }
                </div>
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
    weatherItem:{
        flex:1,
        display:'flex',
        height:'200px',
        textAlign:'center',
        flexDirection:'column'
    }
}

export default Weather