
import React from 'react';
import API from '../../static/api';
import {getFetch} from '../../static/fetch.js'
import { setStorage,getStorage } from '../../static/public';

/* eslint-disable */
const _404 =require('../../assets/loading.gif')

class Novel extends React.Component{
    constructor(props){
        super(props);
        this.state={
          nav:[],
          classify:{},
          chapter:{},
          content:{},
          _i:0,
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
        let host ="https://www.80txt.com/"
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
                url : res.match(/(?<=<a href=")(.*?html)(?="\><img src=")/g),
                status: res.match(/(?<=strong (green|blue)"\>)(.*?)(?=<\/span>)/g),
                img : res.match(/(?<=\<img src=")(.*?)(?=" title="(.*)" ><\/a\>)/g),
            }
            this.setState({
                classify,
                _i:1,
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    getChapter=(url)=>{
        let newUrl =url.replace(/xz\//,'ml_')
        getFetch(API.zys+newUrl,{type:'text'}).then((res)=>{
           
            let chapter ={
                name : res.match(/(?<="og:novel:book_name" content=")(.*?)(?=" \/>)/g)[0],
                url : res.match(/(?<=rel="nofollow" href=")(.*?html)(?=">)/g),
                title : res.match(/(?<=html">)(.*?)(?=<\/a><\/li>)/g)
            }
            
            this.setState({
                chapter,
                _i:2,
            })
        })
    }
    getContent=(url)=>{
        getFetch(API.zys+url,{type:'text'}).then((res)=>{
            let content={
                name :res.match(/(?<=<h1>)(.*?)(?=<\/h1>)/g)[0],
                title:[''],
                con :res.replace(/\n|\s|&nbsp;/g,'').match(/(?<=id="content">)(.*)(?=<divclass="con_l")/g)[0]
            }
            this.setState({
                content,
                _i:3
            })
        })
    }
    
   
    render(){
        const {nav,classify,chapter,content,_i} = this.state
        let novel = [],name="推荐"
        switch(_i){
            case 1:
            novel=[classify]
            name=classify.name
            break;
            case 2:
            novel=[chapter]
            name=chapter.name
            break;
            case 3:
            novel=[content]
            name=content.name
            break;
            default:
            novel= nav.length?[nav[2]]:[]
            break;
        }
        return (
            <div className="novel" style={{height:'100%',overflow:'hidden'}}>

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

                <div className="novel-main" style={styles.novelMain}>
                    <h3 style={{textAlign:'center',marginBottom:'40px'}}>
                        <span style={styles.novelTitle}> {name}</span>
                    </h3>
                    <div style={{paddingBottom:'20px'}}>
                        {
                           !!novel.length&&
                            novel.map((res,i)=>(
                                <div key={i} style={styles.novel}>
                                    {
                                        (!!res&&!!res.title)?
                                        res.title.slice(0,500).map((item,j)=>(
                                            <div key={j} style={{margin:'20px 0'}}>
                                               {
                                                   _i===1?
                                                   <div style={{display:'flex',}}>
                                                       <span style={{flex:1,padding:'5px 10px'}}>
                                                            <img style={styles.img} src={res.img[j]} 
                                                                onError={(e)=>{e.target.src=_404}} />
                                                        </span>
                                                        <span style={{flex:9,cursor:'pointer'}}>
                                                            <p style={{margin:'5px'}}>
                                                                <span style={styles.novelTitle} 
                                                                onClick={()=>{this.getChapter(res.url[j])}}>{item}</span>
                                                                <span style={styles.author}>{res.author[j]}</span>
                                                                <span style={styles.novelStatus}>{res.status[j]}</span>
                                                            </p>
                                                            <p style={styles.introduce}>
                                                                {res.introduce[j]||'暂无简介'}
                                                            </p>
                                                        </span>
                                                    </div>
                                                    :_i==2?
                                                    <div style={{width:'33%',float:'left',}}>
                                                        <p className="p" style={{margin:'10px 0',padding:'0 10px'}}>
                                                            <a className="chapter" onClick={()=>{this.getContent(res.url[j])}}>{item}</a>
                                                        </p>
                                                    </div>
                                                    : _i==3?
                                                    <div style={{paddingBottom:'30px'}}>
                                                        <article dangerouslySetInnerHTML={{ __html:res.con }}>
                                                         </article>
                                                    </div>
                                                   :<div>
                                                        <i style={{color:'#EE7942',margin:'0 25px'}}>{j+1}.</i>
                                                        {item}
                                                    </div>
                                               }
                                            </div>
                                        )):null
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
        borderRadius:'2px',
        display:'inline-block',
        borderBottom:'1px solid #efefef'
    },
    novel:{
        margin:'0 5%',
    },
    novelMain:{
        width:'100%',
        height:'85%',
        overflow:'auto',
        padding:'20px 0',
    },
    img:{
        width: '90px', 
        height: '120px',
        border: '1px solid #ccc',
        borderRadius: '4px'
    },
    novelTitle:{
        textDecoration: 'underline',
        fontSize: '17px'
    },
    author:{
        margin: '0 20px',
        fontSize: '13px',
        color: '#521'
    },
    novelStatus:{
        margin: '0 20px', 
        fontSize: '12px', 
        display: 'inline-block', 
        transform: 'scale(0.85)'
    },
    introduce:{
        color: '#444', 
        fontSize: '13px', 
        padding: '8px 0', 
        textIndent: '13px'
    }
}

export default Novel