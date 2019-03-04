
import React from 'react';
import Input from '../../components/Input/'
import {getTime,setStorage,getStorage} from '../../static/public.js'
import API from '../../static/api';
import {getFetch} from '../../static/fetch.js'
// import './index.css'
/* eslint-disable */

//这是第一版本。有时间要重构
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
            excerpt:[],
            isExcerpt:false
        }
    }
    componentDidMount(){
        this.setArticle()
    }
    //展示menu，存选中文字
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
    //自定义菜单
    opMenu=(f,v,param)=>{
        if(f=='menu') {
            const {txt,data} =this.state
            let { excerpt} = this.state
            const {year,month,day,hours,minutes,seconds} = getTime()
            switch(v){
                case 1:
                    let json= {
                        title:data.title,
                        author:data.author,
                        id:data.date.curr,
                        text:[
                            {
                                txt:txt,
                                time:`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
                            }
                        ],
                    }
                    excerpt.forEach((res=>{
                        res.id==json.id?(res.text.push(json.text[0]),json={}):''
                    }))
                    !!json.id&&excerpt.push(json)
                    this.setState({
                        excerpt,
                    },()=>{
                        setStorage('excerpt',excerpt)
                    })
                break;
                case 'del':
                    excerpt.forEach((res,i)=>{
                        res.id==param.id?res.text.splice(param.num, 1):''
                        if(!res.text.length){
                            excerpt.splice(i,1)
                        }
                    })
                    this.setState({
                        excerpt,
                    },()=>{
                        setStorage('excerpt',excerpt)
                    })
                break;
                default:
                break;
            }
        }
        this.setState({
            menu:[] //重置menu坐标
        })
    }
    //设置（初始化）文章
    setArticle=(data)=>{
        let article = getStorage('article')||[]
       
        article.length>10?article.shift():''

        if(!!data){ //存历史记录
            article.push(data)
            setStorage('article',article)
        }else{ //初始化
            let excerpt = getStorage('excerpt')||[]
            article.length?
            this.setState({
                data:article[article.length-1],
                excerpt:excerpt
            }):this.init()
        }
    }
    //获取 在线文章
    init=( i,v )=>{
        let day='today',time=''
        if(i=='random'){
            day = i
        }
        if(i=='date' && Number(v)){
            day = 'day';
            time = v
        }
        getFetch(API.article+`${day}?dev=1&date=${time}`).then(res=>{
            this.setState({
                list:[], //清空历史记录
                isExcerpt:false, //重置 摘抄标志
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
    //改变展示，输入时间 框
    changeDate=()=>{
        const date =this.state.date
        this.setState({
            date:!date
        })
    }
    // 展示摘抄
    excerptShow =()=>{
        this.setState({
            isExcerpt:true,
            list:[],
            data:{}
        })
    }
    //历史记录
    history =(time)=>{
        let article = getStorage('article')||[],list=[],data={},isExcerpt=false
        article.forEach(res => {
            if(!!time){//点击历史记录title展示文章
                res.date&&(res.date.curr==time)?data=res:''
            }else{ //点击历史记录展示历史记录
                list.push({
                    title:res.title,
                    author:res.author,
                    time:res.date&&(res.date.curr||'')
                })
            }
        });
        this.setState({
            list,
            data,
            isExcerpt
        })

    }
    render(){
        const {data,date,list,menu,isExcerpt,excerpt} =this.state
        return (
            <div className="essay" style={{padding:'10px',overflow:'hidden',}}>
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
                        <div style={{position:'absolute',right:'8px',fontSize:'12px'}}>
                            <a style={styles.tip} onClick={this.init.bind(this,'random')}>随机文章</a>
                            <br/>
                            {
                                date
                                ?<a style={styles.tip} onClick={this.changeDate}>
                                    {data.date&&data.date.curr}
                                </a>
                                :<Input  clear={false} maxLength={8} style={{width:'80px'}} 
                                    placeholder="请输入日期" 
                                    onBlur={this.changeDate}
                                    enter={this.init.bind(this,'date')}
                                    inputStyle={styles.inputStyle}
                                />
                            }
                            {date?<br />:''}
                            <br />
                            {
                                !isExcerpt&&
                                <a style={Object.assign({marginRight:'10px'},styles.tip)} onClick={this.excerptShow}>摘抄</a>
                            }
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
                    <article dangerouslySetInnerHTML={{ __html:data.content?data.content:'' }} 
                      onMouseUp={this.handleMouseUp}>
                    </article>
                   
                    <div style={{paddingBottom:'80px'}}>
                    {/* 历史记录 */}
                        {
                            !!list.length&&
                            list.map((res,i)=>(
                                <div key={i} style={{display:'flex'}}>
                                    <h3 style={{flex:1,textAlign:'left'}} className="p">
                                        <a style={styles.tip} onClick={this.history.bind(this,res.time)}>{res.title}</a>
                                    </h3>
                                    <p style={{flex:0.6,textAlign:'left'}}>
                                        {res.author}
                                    </p>
                                    <p style={{flex:1,textAlign:'left'}}>
                                        {res.time}
                                    </p>
                                </div>
                            ))
                        }
                    {/* 摘抄 */}
                        {
                            isExcerpt&&
                            excerpt.map((res,i)=>(
                                <div key={i} style={{display:'flex'}}>
                                    <div style={{flex:9,borderBottom:'1px solid #000',marginBottom:'15px'}}>
                                        <div style={{float:'left',width:'17%',marginRight:'10px'}}>
                                            <div style={{width:'100%',border:'1px solid #ccc',padding:'6px',borderRadius:'6px'}}>
                                                <h3 style={Object.assign({textAlign:'center',marginBottom:'15px'},styles.tip)} 
                                                    onClick={this.history.bind(this,res.id)}>{res.title}</h3>
                                                <p style= {{textAlign:'center'}}>{res.author}</p>
                                                <p style= {{textAlign:'center',wordBreak: 'break-all'}}>{res.id}</p>
                                            </div>
                                        </div>
                                        <div style={{overflow:'hidden',padding:'0 10px'}}>
                                            {
                                                res.text.map((item,j)=>(
                                                    <p>
                                                        <span style={{fontSize:'13px'}}>{item.txt}</span>
                                                        <a style={{color:'red',fontSize:'12px',margin:'0 10px'}}>{item.time}</a>
                                                        <i className="fa fa-trash-o" onClick={this.opMenu.bind(this,'menu','del',{id:res.id,num:j})}></i>
                                                    </p>
                                                ))
                                            }
                                        </div>
                                  </div>
                                  <div style={{flex:1}}></div>
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
        color:'#FF7F24',
        textDecoration:'underline',
        cursor:'pointer',
    },
    inputStyle:{
        border:'none',
        padding:0,
        // width:'70px',
        fontSize:'12px',
        borderRadius:0,
        textIndet:'0',
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