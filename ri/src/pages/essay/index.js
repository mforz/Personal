
import React from 'react';
import Input from '@/components/Input/'
import {getCookie,getTime,setStorage,getStorage} from '@/static/public.js'
import API from '../../static/api';
import {getFetch} from '@/static/fetch.js'
// import './index.css'
/* eslint-disable */

class Essay extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:{},
            height:0,
            date:true,
            list:[]
        }
    }
    componentDidMount(){
        let dom = document.getElementById('bg')
        let height= document.body.clientHeight-dom.clientHeight
        this.setState({
            height
        })
        this.setArticle()
    }

    setArticle=(data)=>{
        let article = getStorage('article')||[]
        article.length>10?article.shift():''

        if(!!data){
            article.push(data)
            setStorage('article',article)
        }else{
            article.length?
            this.setState({
                data:article[article.length-1]
            }):this.init()
        }
    }
    init=( i,v )=>{
        let day='today',time=''
        if(i=='random'){
            day = i
        }
        if(i=='date'){
            day = 'day';
            time = v
        }
        getFetch(API.article+`${day}?dev=1&date=${time}`).then(res=>{
            this.setState({
                list:[],
                data:res.data,
            },()=>this.setArticle(res.data))

        }).catch(err=>{
            this.setState({
                data:{
                    title:'文章未找到'
                }
            })
        })
    }
    changeDate=()=>{
        const date =this.state.date
        this.setState({
            date:!date
        })
    }
    history =(time)=>{
        let article = getStorage('article')||[],list=[],data={}
        article.forEach(res => {
            if(!!time){
                res.date&&(res.date.curr==time)?data=res:''
            }else{
                list.push({
                    title:res.title,
                    author:res.author,
                    time:res.date&&(res.date.curr||'')
                })
            }
            
        });
        this.setState({
            list,
            data
        })

    }
    render(){
        const {data,height,date,list} =this.state
        return (
            <div className="essay" style={{height:height,overflow:'hidden'}}>
                <div style={styles.articleBar}>

                    <header style={{textAlign:'center',position:'relative'}}>
                        <div style={{position:'absolute',right:'20px',fontSize:'12px'}}>
                            <a style={styles.tip} onClick={this.init.bind(this,'random')}>随机文章</a>
                            <br/>
                            {
                                date
                                ?<a style={styles.tip} onClick={this.changeDate}>
                                    {data.date&&data.date.curr}
                                </a>
                                :<Input  clear={false} maxLength={8} style={{width:'70px'}} 
                                    placeholder="请输入日期" 
                                    onBlur={this.changeDate} 
                                    enter={this.init.bind(this,'date')}
                                    inputStyle={styles.inputStyle}
                                />
                            }
                            <br /><br />
                            <a style={styles.tip} onClick={this.history.bind(this,null)}>历史记录</a>
                        </div>
                        <h3>
                            {data.title}
                        </h3>
                        <p style={{margin:'20px'}}>
                            {data.author}
                        </p>
                    </header>

                    <article dangerouslySetInnerHTML={{ __html:data.content?data.content:'' }}>
                    </article>
                    <div style={{paddingBottom:'80px'}}>
                        {
                            !!list.length&&
                            list.map((res,i)=>(
                                <div key={i} style={{display:'flex'}}>
                                    <h3 style={{flex:1,textAlign:'left'}} className="p">
                                        <a style={styles.tip} onClick={this.history.bind(this,res.time)}>{res.title}</a>
                                    </h3>
                                    <p style={{flex:2.5,textAlign:'left'}}>
                                        {res.author}
                                    </p>
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
    articleBar:{
        width:'100%',
        height:'100%',
        margin:'0 auto',
        marginTop:'60px',
        maxWidth:'800px',
        overflow:'auto'
    },
    tip:{
        color:'#ccc',
        textDecoration:'underline',
        cursor:'pointer',
        margin:'10px'
    },
    inputStyle:{
        border:'none',
        padding:0,
        width:'70px',
        fontSize:'12px',
        borderRadius:0,
        borderBottom:'1px solid #ccc'
    }
}

export default Essay