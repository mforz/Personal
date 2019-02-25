
import React from 'react';
import API from '../../static/api';
import {getFetch} from '../../static/fetch.js'

/* eslint-disable */

class Novel extends React.Component{
    constructor(props){
        super(props);
        this.state={
          ul:[],
          nav:{},
          newest:{},
          data:[],
          classify:[]
        }
    }
    componentDidMount(){
        this.init()
    }
    
    init=()=>{
        getFetch(API.bimo,{type:'text'}).then((res)=>{

            // console.log(res)
            let ul = res.match(/<ul(([\s\S])*?)<\/ul>/g)
            console.log(ul)
            // let first = ul[0]
            // let last = ul[ul.length-1]

            let mNav ={
                // name:first.match(/[\u4E00-\u9FA5]{2,4}/g),
                name:ul[0].match(/(?<=title=")(.*?)(?=")/g),
                url:ul[0].match(/(?<=href=")(.*?)(?=")/g),
            }
            let wmNav ={
                // name:first.match(/[\u4E00-\u9FA5]{2,4}/g),
                name:ul[1].match(/(?<=title=")(.*?)(?=")/g),
                url:ul[1].match(/(?<=href=")(.*?)(?=")/g),
            }
            let advise={
                name:ul[ul.length-2].match(/(?<=html"\>)[\u4E00-\u9FA5]{2,4}/g),
                url:ul[ul.length-2].match(/(?<=href=")(.*?html)(?=")/g),
            }

            let nav =[ mNav, wmNav, advise]


            // nav.name.shift()
            // nav.url.shift()
            // nav.name.pop()
            // nav.url.pop()

            // let newest ={
            //     tag:last.match(/\[(.*?)\]/g),
            //     name:last.match(/(?<=\/">)(.*?)(?=<\/a)/g),
            //     url:last.match(/(?<=href=")(.*?)(?=")/g),
            // }

            this.setState({
                nav
            })

        }).catch()
    }

    getNovel =(url)=>{
        getFetch(API.bimo+url,{type:'text'}).then((res)=>{
            let ul = res.match(/<ul(([\s\S])*?)<\/ul>/g)
            let last = ul[ul.length-1]
            let data ={
                tag : last.match(/\[(.*?)\]/g),
                url : last.match(/(?<=href=")(.*?)(?=")/g),
                name : last.match(/(?<=\/">)(.*?)(?=<\/a)/g),
                author : last.match(/(?<=s5">)(.*?)(?=<\/span)/g),
            }
            this.setState({
                data
            })

        }).catch(err=>{
            console.log(err)
        })
    }

    // navClick=(i)=>{
    //     const {nav,ul} = this.state
    //     let url = nav.url[i]
    //     this.getNovel(url)
    // }
   
    render(){
        const {newest,nav,data} = this.state
        const mainName =newest.name?'推荐':''
        // data.name?'':data=newest
        return (
            <div className="novel" style={{overflow:'auto'}}>
                <div className="classify">
                    <div>
                        {
                            !!nav.length&&
                            nav.map((res,i)=>(
                                <div>
                                    {
                                        i==0?
                                        <div>男频：</div>:
                                        i==1?
                                        <div>nv频：</div>
                                        :<div>推荐：</div>
                                    }
                                    <ul key={i} style={{display:'block',width:'100%',overflow:'hidden'}}>
                                        {
                                            res.name.map((item,j)=>(
                                                <li style={{width:'20%',float:'left'}} onClick={()=>this.getNovel(res.url[j])}>
                                                   <a>{item}</a>
                                                </li>
                                            ))
                                        }
                                    
                                    </ul>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="novel-main">
                        <h3>{mainName}</h3>
                        <ul>
                            {
                                data.name&&
                                data.name.map((res,i)=>(
                                    <li key={i}>
                                        <a>{res}</a>
                                    </li>
                                ))
                            }
                        </ul>
                </div>

            </div>
        )
    }
}
const styles={
    
}

export default Novel