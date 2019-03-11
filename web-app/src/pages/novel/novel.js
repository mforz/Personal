
import React from 'react';
import API from '../../static/api';
import {getFetch} from '../../static/fetch.js'
import { setStorage,getStorage,Scroll,Sleep } from '../../static/public';
import Input from '../../components/Input'
/* eslint-disable */
const _404 =require('../../assets/loading.gif')
// https: //www.ctolib.com/mip/xiadd-zhuishushenqi.html
const sleep = new Sleep()
const scroll = new Scroll()

class Novel extends React.Component{
    constructor(props){
        super(props);
        this.state={
            novelArr:[],
            total:0,
            start:0,
            limit:20,
            tip:'',
            word:'',
        }
    }
    componentDidMount(){
        
    }
    getSearch=(w)=>{
        const {word} =this.state
        if(w && w.trim()&& w!==word){
            this.setState({
                novelArr:[],
            },()=>{this.searchN(w)})
        }
       
    }
    searchN=(word)=>{
        if (word && word.trim()) {
            const { start,novelArr,limit } = this.state
            let url = `book/fuzzy-search?query=${word}&start=${start}&limit=${limit}`
            getFetch(API.novel+ url).then(res=>{
                let arr = novelArr.concat(res.books),
                total = res.total
                this.setState({
                    novelArr:arr,
                    total,
                    word,
                    tip:`${word} 共搜索到 ${total} 条数据,已过滤收费`
                })
            }).catch(err=>{
                this.setState({
                    novelArr:[],
                    total:0,
                    tip:'搜索出错了'
                })
            })
        }
    }
    handleScroll=()=>{
        sleep.wait(()=>{
            const {start,total,limit,word} =this.state
            if(start+limit<total){
                this.setState({
                    start:start+limit
                },()=>{this.searchN(word)})
            }
        },2000)
       
    }
    
    render(){
        const {novelArr,tip}= this.state
        return (
            <div className="novel" style={{height:'100%',overflow:'hidden'}}>
                <header>
                    <div style={styles.inputBar}>
                        <Input clear={false} search
                            style={styles.input}
                            enter={this.getSearch}
                            placeholder = "输入小说搜索..."
                            inputStyle={{border:'none',width:'85%',padding:0,}}
                        />
                        <p className="p" style={{padding:'15px 0',fontSize:'12px'}}>
                            {tip}
                        </p>
                    </div>
                </header>
                <div style={{height:'90%',overflow:'hidden'}}>
                    <ul className="scroll" 
                    ref={body=>this.dom=body}
                    style={{height:'90%',overflow:'auto'}}
                    onScroll={()=>{scroll.to(this.dom,this.handleScroll)}}>
                        {
                            novelArr.map((res,i)=>(
                                <li key={i} style={styles.card}>
                                    {/* left */}
                                    <div style={{flex:0.4,marginLeft:'-5px',justifyContent:'center',color:'#f4b58e',alignItems:'center'}}>
                                       <span style={{textDecoration:'underline',fontSize:'13px'}}>
                                            {i+1}
                                        </span>
                                    </div>
                                    <div style={{flex:2,overflow:'hidden',padding:'5px 0'}}>
                                        <img style={{width:'100%',height:'100%'}} src={unescape(res.cover.split('/agent/')[1]||'')} />
                                    </div>
                                    {/* right */}
                                    <div style={{flex:9,height:'100%',display:'flex',flexDirection:'column'}}>
                                        <p className="p" style={{textDecoration:'underline',margin:'5px 0'}}>
                                           <a>{res.title}</a>
                                           <span style={{margin:'0 15px',color:'#55f6f7'}}>{res.author}</span> 
                                        </p>
                                        <div style={{fontSize:'13px',width:'100%',overflow:'hidden'}}>
                                            <p>类型：{res.cat}</p> 
                                            <p>字数：{res.wordCount}</p>
                                            <p>最新：{res.lastChapter}</p>
                                            <p style={{overflow:'hidden'}}>简介：<span>{res.shortIntro}</span></p>
                                        </div>
                                    </div>
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
    card:{
        width: '90%', 
        maxWidth: '600px', 
        height: '150px', 
        margin: '20px auto',
        padding: '5px 10px',
        display:'flex',
        borderRadius: '6px',
        backgroundColor: '#fff',
        alignItems:'center',
        overflow:'hidden',
        boxShadow: '0 4px 15px 0 #ddd'
    },
    inputBar:{
        width: '50%',
        margin: '15px auto',
    },
    input:{
        width:'100%',
        height: '32px',
        border: '1px solid #ccc', 
        borderRadius: '3px'
    },
  
}

export default Novel