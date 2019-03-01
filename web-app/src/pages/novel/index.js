
import React from 'react';
import API from '../../static/api';
import {getFetch} from '../../static/fetch.js'
import { setStorage,getStorage } from '../../static/public';

/* eslint-disable */
const _404 =require('../../assets/404.jpg')

class Novel extends React.Component{
    constructor(props){
        super(props);
        this.state={
          ul:[],
          nav:[],
          classify:{},
          chapter:{},
          content:{},
          i:0,
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
                title:ul[ul.length-2].match(/(?<=html"\>)[\u4E00-\u9FA5]{1,12}/g),
                url:ul[ul.length-2].match(/(?<=href=")(.*?html)(?=")/g),
            }
            let nav =[ mNav, wmNav, advise]

            this.setState({
                nav,
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


    getClassify =(url,name)=>{
        const host = "https://www.80txt.com"
        getFetch(API.zys+host+url, {type:'text'}).then((res)=>{
            let classify ={
                name:name,
                title : res.match(/(?<="\>)(.*?)(?=TXT下载<)/g),
                introduce: res.match(/(?<=book_jj"\>\n)(.*)/g),
                author: res.match(/(?<=author(.*)"\>)(.*?)(?=<\/a>)/g),
                url : res.match(/(?<=\<a href=")(.*?html)(?="\><img src=")/g),
                status: res.match(/(?<=strong (green|blue)"\>)(.*?)(?=<\/span>)/g),
                img : res.match(/(?<=\<img src=")(.*?)(?=" title="(.*)" ><\/a\>)/g),
            }
            this.setState({
                classify,
                i:1,
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    getChapter=(url)=>{
        let newUrl =url.replace(/xz\//,'ml_')
        getFetch(API.zys+newUrl,{type:'text'}).then((res)=>{
           
            let chapter ={
                title : res.match(/(?<="og:novel:book_name" content=")(.*?)(?=" \/>)/g)[0],
                url : res.match(/(?<=rel="nofollow" href=")(.*?html)(?=">)/g),
                name : res.match(/(?<=html">)(.*?)(?=<\/a><\/li>)/g)[0]
            }
            
            this.setState({
                chapter,
                i:2,
            })
        })
    }
    getContent=(url)=>{
        getFetch(API.zys+url,{type:'text'}).then((res)=>{
            let content={
                name :res.match(/(?<=<h1>)(.*?)(?=<\/h1>)/g)[0],
                con :res.replace(/\n|\s|&nbsp;/g,'').match(/(?<=id="content">)(.*)(?=<divclass="con_l")/g)[0]
            }
            this.setState({
                content,
                i:3
            })
        })
    }
    
   
    render(){
        const {nav,classify,chapter,content,i} = this.state
        let novel = [],name="推荐"
        switch(i){
            case 1:
            novel=[classify]
            name=classify.name
            break;
            case 2:
            novel=[null,chapter]
            name=chapter.name
            break;
            case 3:
            novel=[null,null,content]
            name=content.name
            break;
            default:
                novel= nav.length?[nav[2]]:[]
            break;
        }
        console.log(i,novel)
        return (
            <div className="novel" style={{overflow:'hidden',overflowY:'auto'}}>

                <div className="classify" style={styles.classify}>
                    {
                      !!nav.length &&
                        nav.slice(0,2).map((res,i)=>(
                            <div key={i} style={{display:'flex',alignItems:'center'}}>
                                {
                                    i==0
                                    ? <div style={Object.assign({color:'#CDBE70'},styles.classifyBar)}>nan频：</div>:
                                    i==1
                                    ? <div style={Object.assign({color:'#FF8247'},styles.classifyBar)}>nv频：</div>

                                    : <div style={Object.assign({color:'#CDAA7D'},styles.classifyBar)}>推荐：</div>
                                }
                                <ul key={i} style={{flex:10, margin:'10px 0'}}>
                                    {
                                        res.name.map((item,j)=>(
                                            <li key={j} className="classify-item" style={styles.classifyItem} 
                                                onClick={()=>this.getClassify(res.url[j],item)}>
                                                <a>{item}</a>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        ))
                    }
                </div>

                <div className="novel-main" style={{width:'100%',padding:'20px 0'}}>

                    <h3 style={{textAlign:'center',marginBottom:'40px'}}>
                           <span style={styles.novelTitle}> {name}</span>
                    </h3>

                    <div>
                        {
                          novel.length&&
                            novel.map((res,i)=>(
                                <div key={i} style={styles.novel[i]}>
                                    {
                                      !!res.title&&
                                        res.title.map((item,j)=>(
                                            <div style={{margin:'10px 0'}}>
                                                <i style={{color:'#EE7942',margin:'0 25px'}}>{j+1}.</i>
                                                <a>{item}</a>
                                            </div>
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}
const styles={
    classify:{
        padding:'0 10px',
        margin:'10px 20px',
        borderRadius:'3px',
        backgroundColor:'#fffbf3',
        border:'1px solid #ffeabf',
    },
    classifyBar:{
        flex:1,
        textAlign:'center'
    },
    classifyItem:{
        width:'20%',
        float:'left',
        color:'#666',
        fontSize:'13px',
        cursor:'pointer',
        textAlign:'center',
    },
    novelTitle:{
        color:'#2c3e50',
        padding:'0 25px',
        display:'inline-block',
        borderRadius:'2px',
        borderBottom:'1px solid #efefef'
    },
    novel:[
        {
            margin:'0 5%',
        },{

        }
    ]
}

export default Novel