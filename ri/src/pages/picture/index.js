
import React from 'react';
import Input from '@/components/Input/'
import {getCookie,getTime,setStorage,getStorage} from '@/static/public.js'
import API from '../../static/api';
import {getFetch} from '@/static/fetch.js'
// import './index.css'
/* eslint-disable */

class Picture extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:{},
            height:0,
            list:[]
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
    init=( i,v )=>{
     getFetch(API.tuchong).then(res=>{
        //  console.log(res)
         this.setState({
             list:res.feedList
         })
     }).catch(err=>console.log(err))
    }
  
    render(){
        const urlHeader='https://photo.tuchong.com/'
        const {height,list} =this.state
        return (
            <div className="picture" style={{height:height,overflow:'hidden'}}>
             {
                 list.map((res,i)=>(
                     res.images.map((item,j)=>(
                         <img key={j} style={{width:'200px'}} src={urlHeader+item.user_id+'/f/'+item.img_id+'.jpg'}></img>
                     ))
                     
                 ))
             }
            </div>
        )
    }
}
const styles={
  
}

export default Picture