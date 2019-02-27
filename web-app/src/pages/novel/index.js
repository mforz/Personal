
import React from 'react';
import API from '../../static/api';
import {getFetch} from '../../static/fetch.js'
import { setStorage,getStorage } from '../../static/public';

/* eslint-disable */

class Novel extends React.Component{
    constructor(props){
        super(props);
        this.state={
          ul:[],
          nav:{},
          newest:{},
          classify:[],
          data:[],
          chapter:{},
        }
    }
    componentDidMount(){
        this.init()
    }
    
    init=()=>{
        let novel = getStorage('novel')
        if(novel){
            if(novel.nav){
                this.setState({
                    nav:novel.nav
                })
                return
            }
        }
        let host ="https://www.80txt.com"
        getFetch(API.zys+host,{type:'text'}).then((res)=>{
            let ul = res.match(/<ul(([\s\S])*?)<\/ul>/g)
           
            let mNav ={
                name:ul[0].match(/(?<=title=")(.*?)(?=")/g),
                url:ul[0].match(/(?<=href=")(.*?)(?=")/g),
            }
            let wmNav ={
                name:ul[1].match(/(?<=title=")(.*?)(?=")/g),
                url:ul[1].match(/(?<=href=")(.*?)(?=")/g),
            }
            let advise={
                name:ul[ul.length-2].match(/(?<=html"\>)[\u4E00-\u9FA5]{1,12}/g),
                url:ul[ul.length-2].match(/(?<=href=")(.*?html)(?=")/g),
            }
            let nav =[ mNav, wmNav, advise]

            this.setState({
                nav
            },()=> {
                !!novel? novel.nav = nav:novel={nav:nav}
                setStorage('novel',novel)
            })
        }).catch(err=>{
            this.setState({
                nav:[]
            })
        })
    }

    getNovel =(url,name)=>{
        const host = "https://www.80txt.com"
        getFetch(API.zys+host+url, {type:'text'}).then((res)=>{
            let data =[{
                name : res.match(/(?<="\>)(.*?)(?=TXT下载<)/g),
                introduce: res.match(/(?<=book_jj"\>\n)(.*)/g),
                author: res.match(/(?<=author(.*)"\>)(.*?)(?=<\/a>)/g),
                url : res.match(/(?<=\<a href=")(.*?html)(?="\><img src=")/g),
                status: res.match(/(?<=strong (green|blue)"\>)(.*?)(?=<\/span>)/g),
                img : res.match(/(?<=\<img src=")(.*?)(?=" title="(.*)" ><\/a\>)/g),
            }]
            this.setState({
                data,name
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    getChapter=(url)=>{
        let newUrl =url.replace(/xz\//,'ml_')
        getFetch(API.zys+newUrl,{type:'text'}).then((res)=>{
            let chapter ={
                url : res.match(/(?<=rel="nofollow" href=")(.*?html)(?=">)/g),
                name : res.match(/(?<=html">)(.*?)(?=<\/a><\/li>)/g)
            }
            this.setState({
                chapter
            })
            console.log(chapter)
        })
    }
    getContent=(url)=>{
        console.log(url)
        getFetch(API.zys+url,{type:'text'}).then((res)=>{
            console.log(res)
            // let title = res.match(/(?<=<h1>)(.*?)(?=<\/h1>)/g)
            // console.log(title)
            let title = res.match(/(&nbsp;&nbsp;&nbsp;&nbsp;")(.*?)(?=<div class="con_l">)/g)
            console.log(title)
        })
    }
   
    render(){
        const {nav,data,name,chapter} = this.state
        const mainName =!!data.length?name:'推荐'
        let novel = !!data.length ? data : nav.length?nav.slice(2,3):[]
        if(chapter.name&&chapter.name.length){
            novel=[]
        }
        return (
            <div className="novel" style={{overflow:'auto'}}>
                <div className="classify">
                    <div>
                        {
                            !!nav.length&&
                            nav.slice(0,2).map((res,i)=>(
                                <div key={i} style={{display:'flex',margin:'20px 0',alignItems:'center'}}>
                                    {/* 频道 */}
                                    {
                                        i==0
                                        ?<div style={{flex:1,color:'#CDBE70'}}>男频：</div>:
                                        i==1
                                        ?<div style={{flex:1,color:'#FF8247'}}>nv频：</div>
                                        :<div style={{flex:1,color:'#CDAA7D'}}>推荐：</div>
                                    }
                                    <ul key={i} style={{flex:10}}>
                                        {
                                            res.name.map((item,j)=>(
                                                <li key={j} className={`p novel-classify-${i}`} style={{width:'20%',float:'left'}} onClick={()=>this.getNovel(res.url[j],item)}>
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

                <div className="novel-main" style={{width:'100%'}}>
                    <h3 style={{textAlign:'center'}}>{mainName}</h3>
                    {
                        !!novel.length&&
                        novel.map((res,i)=>(
                            <ul key={i} style={{width:'100%',overflow:'hidden'}}>
                                {
                                    res.name.map((item,j)=>(
                                        <li key={j} style={{margin:'10px 0',width:'100%',overflow:'hidden'}}>
                                            {
                                                !!data.length?
                                                <div style={{display:'flex',width:'100%'}}>
                                                    {/* 图片 */}
                                                    <div style={{width:'100px',float:'left',padding:'0 10px'}}>
                                                        <a href={res.url[j]} >
                                                            <img style={{width:'100px',height:'120px'}} src={res.img[j]} />
                                                        </a>
                                                    </div>
                                                    <div style={{overflow:'hidden'}}>
                                                        {/* 标题作者 */}
                                                        <span style={{display:'flex',alignItems:'center'}}>
                                                            <h3><a style={{color:'#9BCD9B'}} href="javascript:;" onClick={()=>this.getChapter(res.url[j])}>{item}</a></h3> 
                                                            <a style={{fontSize:'12px',margin:'0 20px',color:'#C67171'}}>{res.author[j]}</a>
                                                            <a style={{fontSize:'12px',margin:'0 20px',color:'#C1CDC1'}}>{res.status[j]}</a>
                                                        </span>
                                                        {/* 内容简介 */}
                                                        <span style={{display:'flex',margin:'10px 0'}}>
                                                            <p style={{fontSize:'13px',color:'#C1C1C1'}}>
                                                                {res.introduce[j]}
                                                            </p>
                                                        </span>

                                                    </div>
                                                </div>
                                                :
                                                <div style={{width:'100%'}}>
                                                    <i style={{color:'#EE7942',margin:'0 25px'}}>{j+1}.</i>
                                                    <span>{item}</span>
                                                </div>
                                            }
                                        </li>
                                    ))
                                }
                            </ul>
                        ))
                    }
                    {
                         !!novel.length&&data.length?
                         <div style={{marginBottom:'40px',display:'flex',justifyContent:'center'}}>
                             <button className="button" style={{margin:'10px'}}>
                                 上一页
                             </button>

                             <button className="button" style={{margin:'10px'}}>
                                 下一页
                             </button>

                         </div>
                         :null
                    }
                    {
                        chapter.name&&
                        <div>
                            {
                                chapter.name.map((res,i)=>(
                                    <p style={{float:'left',width:'25%'}} key={i}>
                                        <a href="javascript:;" onClick={()=>{this.getContent(chapter.url[i])}}>{res}</a>
                                    </p>
                                ))
                            }
                        </div>
                    }
                </div>
            </div>
        )
    }
}
const styles={
    
}

export default Novel