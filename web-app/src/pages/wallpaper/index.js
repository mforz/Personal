
import React from 'react';
// import Route from '../../routers/'
import {scriptLoad, setStorage, getStorage,Sleep} from '../../static/public.js'
import { getFetch } from '../../static/fetch';
import API from '../../static/api';

const sleep = new Sleep()

/* eslint-disable */
class Wallpaper extends React.Component{
    constructor(props){
        super(props);
        this.state={
           data:[]
        }
    }
    componentDidMount(){
        let param='limit=30&skip=0&adult=false&first=0&order=hot'

        getFetch(API.wallpaper+param).then(res=>{
            let data=[],item=[]

            !!res.res&&!!res.res.vertical&&
            res.res.vertical.map((img,i)=>{
                item.push(img)
                if((i+1)%3==0){
                    data.push(item)
                    item=[]
                }
            })
            console.log(data)
            this.setState({
                data
            })
        }).catch(err=>{
            console.log(err)
            this.setState({
                data:[]
            })
        })
    }
    init=()=>{
       
    }
    render(){
        const { data } = this.state
        return (
            <div className="wallpaper" style={{padding:'10px',overflow:'hidden'}}>
                <div style={{width:'90%',maxWidth:'200px',margin:'30px auto',display:'flex',textAlign:'center'}}>
                    <nav style={{flex:1}}>热门</nav>
                    <nav style={{flex:1}}>最新</nav>
                    <nav style={{flex:1}}>分类</nav>
                </div>
                <div>
                    <div >
                        {
                            !!data.length&&
                            data.map((res,i)=>{
                                let a = Math.ceil(Math.random()*10%3)
                                return(
                                    <div key={i} style={{width:'80%',margin:'20px auto',height:'482px',display:'flex',overflow:'hidden'}}>
                                    {
                                        !!res.length&&
                                        res.map((item,j)=>(
                                        <div style={{flex:1,margin:'5px 10px'}}>
                                            <img key={j} style={{width:'100%',height:'100%'}} src={item.img} />
                                         </div>
                                        ))
                                    }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }

}
let active= {

}
const styles ={
   img1:[
       {
           width:'33.3%',
           height:'480px',
           position:'absolute',
           top:0,
           left:0,
           border:'1px solid #ccc',
       },{
            width:'33.3%',
            height:'480px',
            position:'absolute',
            top:0,
            left:'33.3%',
            border:'1px solid #ccc',
       },{
            width:'32%',
            height:'480px',
            position:'absolute',
            top:0,
            right:0,
            border:'1px solid #ccc',
       }
   ],
   img2:[
       {
        width:'49%',
        height:'240px',
        border:'1px solid #ccc',
        position:'absolute',
        top:0,left:0,
       },{
        width:'49%',
        height:'480px',
        border:'1px solid #ccc',
        position:'absolute',
        top:0,right:0,
       },{
        width:'49%',
        height:'240px',
        position:'absolute',
        border:'1px solid #ccc',
        bottom:0,left:0,
       }
   ],
   img3:[
       {
        width:'49%',
        height:'480px',
        border:'1px solid #ccc',
        position:'absolute',
        top:0,left:0,
       },{
        width:'49%',
        height:'240px',
        border:'1px solid #ccc',
        position:'absolute',
        top:0,right:0,
       },{
        width:'49%',
        height:'240px',
        border:'1px solid #ccc',
        position:'absolute',
        bottom:0,right:0,
       }
   ]

}

export default Wallpaper