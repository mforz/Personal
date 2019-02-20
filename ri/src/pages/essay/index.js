
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
            list:[],
            menu:[],
            timer:null,
            txt:null,
            excerpt:[]
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
    
    handleMouseUp=(e)=>{
        let txt= window.getSelection ? e.view.getSelection()+'': document.selection.createRange().text
        let menu = []
        if(txt.match(/[\u4E00-\u9FA5A-Za-z0-9_]/)){
            menu=[e.pageX,e.pageY]
        }
        this.setState({
            menu,
            txt
        })
    }

    opMenu=(f,v)=>{
        if(f=='menu') {

            const {txt,data} =this.state
            let { excerpt} = this.state
            const {year,month,day,hours,minutes,seconds} = getTime()

            switch(v){
                case 1:
                    let json= {
                        title:data.title,
                        author:data.author,
                        text:txt,
                        time:`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
                    }
                    excerpt.push(json)

                    this.setState({
                        excerpt,
                    },()=>{
                        setStorage('excerpt',excerpt)
                    })
                break;
                case 2:
                break;
                default:

                break;
            }
        }
        this.setState({
            menu:[]
        })
    }
    setArticle=(data)=>{

        let article = getStorage('article')||[]
       
        article.length>10?article.shift():''

        if(!!data){
            article.push(data)
            setStorage('article',article)
        }else{
            let excerpt = getStorage('excerpt')||[]
            article.length?
            this.setState({
                data:article[article.length-1],
                excerpt:excerpt
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
        const {data,height,date,list,menu} =this.state
        return (
            <div className="essay" style={{height:height,overflow:'hidden',}}>
                <div style={styles.articleBar}>
                    {//菜单
                        !!menu.length&&
                        <div style={styles.mask} onClick={this.opMenu.bind(this,'hidden')}>
                            <aside style={Object.assign({top:menu[1], left:menu[0]},styles.menuBar)}>
                                <p style={styles.menuItem} onClick={this.opMenu.bind(this,'menu',1)}>
                                    <a style={styles.menu}>摘抄</a>
                                </p>
                            </aside>
                        </div>
                    }
                   {/* 头部 标题、作者 */}
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
                            <a style={Object.assign({marginRight:'10px'},styles.tip)} onClick={this.init.bind(this,'random')}>摘抄</a>
                            {
                                !list.length&&
                                <a style={styles.tip} onClick={this.history.bind(this,null)}>历史记录</a>
                            }
                        </div>
                        <h3>
                            {data.title}
                        </h3>
                        <p style={{margin:'20px'}}>
                            {data.author}
                        </p>
                    </header>
                    {/* 内容文章 */}
                    <article dangerouslySetInnerHTML={{ __html:data.content?data.content:'' }} onMouseUp={this.handleMouseUp}>
                    </article>
                    {/* 历史记录 */}
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
        overflow:'auto',
    },
    tip:{
        color:'#ccc',
        textDecoration:'underline',
        cursor:'pointer',
    },
    inputStyle:{
        border:'none',
        padding:0,
        width:'70px',
        fontSize:'12px',
        borderRadius:0,
        borderBottom:'1px solid #ccc'
    },
    mask:{
        position:'fixed',
        opacity:1,
        top:0,left:0,
        right:0,bottom:0,
    },
    menuBar:{
        width:'50px',
        height:'auto',
        backgroundColor:'#ccc',
        position:'absolute',
        overflow:'hidden',
        textAlign:'center',
        borderRadius:5,
    },
    menuItem:{
        margin:'3px 0',
        cursor:'pointer',
        color:'#ccc',
        textDecoration:'underline',
    },
    menu:{
        width:'100%',
        fontSize:'12px',
        color:'#fff'
    }
}

export default Essay