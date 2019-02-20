
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
            list:[],
            isShow:null,
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
    showPic=(res)=>{
        console.log(res)
        this.setState({
            data:res,
            isShow:true
        })
    }
  
    render(){
        const urlHeader='https://photo.tuchong.com/'
        const {height,list,data,isShow} =this.state
        return (
            <div className="picture" style={{height:height,overflow:'hidden',position:'relative'}}>
                
                <div style={{height:'100%',overflow:'auto'}}>
                    {
                        list.map((res,i)=>(
                            <div style={{float:'left',width:'30%',height:'300px',margin:'10px'}}>
                                <div style={{width:'100%',padding:'0 5%',height:'85%',margin:'0 auto'}} onClick={this.showPic.bind(this,res.images)}>
                                    <img style={{width:'100%',height:'100%'}} src={urlHeader+res.images[0].user_id+'/f/'+res.images[0].img_id+'.jpg'} />
                                </div>
                                <p style={{width:'100%',height:'15%',padding:'5px 5%',display:'flex',alignItems:'center'}}>
                                    <span>
                                        <img style={{width:'40px',height:'90%',border:'1px solid #ccc',borderRadius:'20px'}} src={res.site.icon} />
                                    </span>
                                    <span>{res.site.name}</span>
                                    <span>{res.title}</span>
                                </p>
                            </div>
                        ))
                    }
                </div>
                {
                    !!isShow?
                    <div style={{position:'absolute',top:0,bottom:0,left:0,right:0,backgroundColor:'#fff',}}>
                    {
                        data.map((res,i)=>(
                            <div key={i}>
                                <p style={{width:'100%',textAlign:'center'}}>
                                    <h3>{res.description}</h3>
                                </p>
                                <div style={{width:'60%',height:'400px',margin:'10px auto'}}>
                                    <img style={{width:'100%',height:'100%'}} src={urlHeader+res.user_id+'/f/'+res.img_id+'.jpg'} />
                                </div>
                            </div>
                        ))
                    }
                    </div>
                    :null
                }
               
            </div>
        )
    }
}
const styles={
  
}

export default Picture