
import React from 'react';
import API from '../../static/api';
import {getFetch} from '../../static/fetch.js'
import { isPhone,setStorage,getStorage,Scroll,Sleep } from '../../static/public';
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
            data:[],
            novelArr:[],
            chapterArr:[],
            
            total:0,
            start:0,
            limit:20,
            bookId:0,

            tip:'',
            word:'',
            cover:'',
            book:'',
        }
    }
    componentDidMount(){
        
    }
    //enter事件准备搜索
    getSearch=(w)=>{
        const {word} =this.state
        if(w && w.trim()&& w!==word){
            this.setState({
                novelArr:[],
            },()=>{this.searchN(w)})
        }
       
    }
    //搜索小说
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
                    book:'',
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
    //获取书源
    // toc?view=summary&book=57206c3539a913ad65d35c7b
    getSummary = ( id, word, cover)=>{
        if(id && word){
            let url = `toc?view=summary&book=${id}`
            getFetch(API.novel+ url).then(res=>{
                let  novelArr = res || []
                novelArr.forEach((element,i) => {
                    if(element.source=='zhuishuvip'){
                        novelArr.splice(i,1)
                    }
                });
                this.setState({
                    novelArr,
                    cover,
                    total:0,
                    tip:`${word} 共搜索到 ${novelArr.length||0} 条书源`
                })
            }).catch(err=>{
                this.setState({
                    novelArr:[],
                    total:0,
                    tip:'搜索出错了'
                })
            })
        }else{
            this.getChapter(id)
        }
    }
    //获取章节
    getChapter =(id)=>{
        if(id){
            this.dom.scrollTop=0
            let url = `toc/${id}?view=chapters`
            getFetch(API.novel+ url).then(res=>{
                //最开始截取100章
                let data = res.chapters || []
                let chapterArr = data.slice(0,100)

                this.setState({
                    data,
                    chapterArr,
                    novelArr:[],
                    cover:'',
                    total:0,
                    tip:'',
                })
            }).catch(err=>{
                this.setState({
                    novelArr:[],
                    chapterArr:[],
                    data:[],
                    total:0,
                    tip:'搜索出错了'
                })
            })
        }
    }
    //获取小说内容
    getContent =(link)=>{
        this.dom.scrollTop=0
        let url= `chapter/${escape(link)}?k=2124b73d7e2e1945&t=1468223717`
        getFetch(API.chapter + url).then(res=>{
            let d = JSON.stringify(res.chapter.body).replace(/\n/g, <br />)
            this.setState({
                book:res.chapter.body.replace(/\n/g, '<br />')
            })
        }).catch(err=>{
            this.setState({
                book:'获取内容出错'
            })
        })
    }
    //滚动事件
    handleScroll=()=>{
        sleep.wait( () => {
        const {start,total,limit,word,chapterArr,data} = this.state
            if(start+limit < total){
                this.setState({
                    start:start+limit
                },()=>{
                    this.searchN(word)
                })
            }
            if(chapterArr.length < data.length){
                let arr = chapterArr.concat(data.splice(chapterArr.length,100))
                this.setState({
                    chapterArr:arr
                })
            }
        },2000)
    }

    render(){
        const {novelArr,tip,cover,chapterArr,book}= this.state
        const isArrowShow= book? true: false

        return (
            <div className="novel" style={{backgroundColor:!!book?'#e9e6d0':'#fff',}}>
                {
                    isArrowShow&&
                    <div>
                        <i className="fa fa-angle-double-left" ></i>
                    </div>
                }
                <header style={{visibility:book?'hidden':'visible'}}>
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
                <div style={{width:'100%',height:'95%',overflow:'hidden'}}>
                    <ul className="scroll" 
                        ref={body=>this.dom=body}
                        style={styles.scrollUl}
                        onScroll={()=>{scroll.to(this.dom,this.handleScroll)}}
                    >
                        {
                            novelArr.map((res,i)=>(
                            <li key={i} style={styles.card}>
                            
                                <div style={{flex:2,padding:'2px 0',}}>
                                    <img style={styles.novelCover} 
                                    src={unescape(!!res.cover&&res.cover.split('/agent/')[1]||cover||'')}
                                    onClick={(e)=>{this.getSummary(res._id,res.title ,e.target.src)}} />
                                </div>
                                {/* right */}
                                <div style={styles.content}>
                                    <h4 className="p-1" style={{WebkitBoxOrient:'vertical',cursor:'pointer'}}>
                                        <span style={styles.novelTitle} 
                                            onClick={()=>{this.getSummary(res._id,res.title,unescape(!!res.cover&&res.cover.split('/agent/')[1]||cover||''))}}>
                                            {res.title||res.name}
                                        </span>
                                    </h4>
                                    
                                    <div style= {{fontSize:'12px'}}>
                                        <p className="p-1" style={{WebkitBoxOrient:'vertical'}}>
                                            <span style={{fontSize:'12px',color:'#f4b58e',marginRight:'10px'}}>
                                                {res.author}
                                            </span>
                                            <span>{res.cat}</span>
                                        </p>
                                        <p className="p-1" style={{WebkitBoxOrient:'vertical',margin:'7px 0'}}>
                                            <span style={{textDecoration:'underline'}}>
                                                {res.lastChapter&&'最新：'+ res.lastChapter}
                                            </span>
                                        </p>
                                        <p className="p-3" style={{WebkitBoxOrient:'vertical',marginTop:'5px'}}>
                                            <span >{res.shortIntro&&'简介：'+ res.shortIntro}</span>
                                        </p>
                                    </div>
                                </div>
                            </li>
                            ))
                        }
                        {
                            !book&&
                            chapterArr.map((res,i)=>(
                                <li key={i}>
                                 <p className="chapter">
                                     <span onClick={()=>{this.getContent(res.link)}}>
                                         {res.title}
                                     </span>
                                 </p>
                                </li>
                            ))
                        }
                        {
                            
                            <li style={{width:'80%',margin:'0 auto'}}>
                                {/* 返回 */}
                                <div style={{}}>

                                </div>
                                {/* 内容 */}
                                <div style={{backgroundColor:'#e9e6d0'}}>
                                    {
                                        !!book&&
                                        book.split(/\<br \/\>/).map((res,i)=>(
                                            <p key={i} style={styles.book}>
                                                {res}
                                            </p>
                                        ))
                                    }
                                </div>
                                {/* 上下章 */}
                                <div>

                                </div>
                            </li>
                        }
                        
                    </ul>
                </div>
            </div>
        )
    }
}
const styles={
    card:{
        width: '100%', 
        maxWidth: '600px', 
        height: '150px', 
        margin: '20px auto',
        padding: '0 10px',
        display:'flex',
        backgroundColor: '#fff',
        alignItems:'center',
        overflow:'hidden',
    },
    inputBar:{
        width: '50%',
        margin: '15px auto',
        marginBottom:0,
    },
    input:{
        width:'100%',
        height: '32px',
        border: '1px solid #ccc', 
        borderRadius: '3px'
    },
    novelTitle:{
        maxWidth:'75%',
        marginRight:'15px',
        textDecoration:'underline',
        color:'#666',
    },
    novelCover:{
        width:'90px',
        height:'120px',
        borderRadius:'5px',
        boxShadow: '0 4px 8px 0 #ddd',
    },
    scrollUl:{
        width:'90%',
        height:'90%',
        margin:'0 auto',
        overflow:'auto'
    },
    content:{
        flex:8,
        height:'130px',
        padding:'0 10px',
        color:'#999'
    },
    book:{
        textIndent:'2em',
        margin:'10px 0',
        padding:'6px 0',
        color: '#755927'
    }
  
}

export default Novel