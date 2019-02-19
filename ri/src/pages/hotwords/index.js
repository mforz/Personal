
import React from 'react';
// import Input from '@/components/Input/'
import {getCookie,goTo,setStorage,isPhone} from '@/static/public.js'
import API from '@/static/api.js'
import {getFetch} from '@/static/fetch.js'

/* eslint-disable */

class HotWords extends React.Component{
    constructor(props){
        super(props);
        this.state={
            list:[],
            active:'百度',
            close:false,
            tag:[],
            behotTime:0,
            news:[],
            clickNum:0,
            category: 'news_tech',
            height:'500px',
            count:1,
        }
    }
    componentDidMount(){
        let dom = document.getElementById('bg')
        let height= document.body.clientHeight-dom.clientHeight
        this.setState({
            height
        })

        let path=['bdHot','sgHot','sinaHot','wbHot']
        const tag=[
            {name:'科技',category:'news_tech'},
            {name:'娱乐',category:'news_entertainment'},
            {name:'热点',category:'news_hot'},
            {name:'游戏',category:'news_game'},
            {name:'体育',category:'news_sports'},
            {name:'汽车',category:'news_car'},
            {name:'财经',category:'news_finance'},
            {name:'搞笑',category:'funny'},
            {name:'军事',category:'news_military'},
            {name:'国际',category:'news_world'},
            {name:'时尚',category:'news_fashion'},
            {name:'旅游',category:'news_travel'},
            {name:'养生',category:'news_regimen'},
            {name:'历史',category:'news_history'},
            {name:'美文',category:'news_essay'},
            {name:'美食',category:'news_food'},
            {name:'探索',category:'news_discovery'},
            {name:'育儿',category:'news_baby'},
        ]
        this.setState({
            tag
        },()=>{
            this.init(path)
            this.getNews(tag[0].category)
        })
       
    }
    init=(path)=>{
        let list =[],
        serach={
            sgHot:'https://www.sogou.com/web?query=',
            bdHot:'https://www.baidu.com/s?wd=',
            sinaHot:'http://www.sina.com.cn/mid/search.shtml?q=',
            wbHot:'https://s.weibo.com/weibo?q='
        }
        path.forEach((item,i) => {
            const obj = {}
            item=='wbHot'?obj.type='text':null
            getFetch(API[item],obj).then((res)=>{
                
                let arrEach= null, name='',arr=[]
                //数据清洗构造热搜♨️
                item==='bdHot' ? (name='百度', arrEach=res.result.topwords.slice(0,10)||[]) : ''
                item==='sgHot' ? (name='搜狗', arrEach=res||[]) : ''
                item=='sinaHot'? (name='新浪', arrEach=res.result.data||[]) : ''
                item==='wbHot' ? (name='微博', arrEach=JSON.parse(res.match(/\[(.*)\]/)[0])||[]) : ''
                //遍历数据，构造object
                arrEach.forEach((res)=>{
                    arr.push({
                        title: res.keyword || res.title || res.word.replace(/#/g, ''),
                        url: serach[item] + (res.keyword||res.title||res.word.replace(/#/g,''))
                    })
                })
                //存入list
                list.push({
                    name,
                    data:arr
                })
                //请求完成 存入state
                list.length===path.length
                &&this.setState({
                    list
                },()=>console.log(list))
            }).catch(err=>{
                // console.log(err,list)
                //请求失败 存入state
                this.setState({
                    list
                })
            })
        });
    }

    getNews = (category) => {
        const {behotTime,count} = this.state

        let time= (new Date()).getTime()

        getFetch(API.ttNews + `?category=${category}&count=${20}&refer=1&min_behot_time=${behotTime}&last_refresh_sub_entrance_interval=${time}`).then((res) => {
            let data= []
            res.data.forEach((item)=>{
                data.push(JSON.parse(item.content))
            })
            console.log(data)
            this.setState({
                news:data,
                behotTime:time,
                category:category
            })
        }).catch(err=>{
            this.setState({
                news:[]
            })
        })
    }

    changeActive=(flag,name)=>{
        let {close} =this.state
        flag=='close'?close=true:''
        this.setState({
            active:name,
            close
        })
    }
    newClick=(f,i)=>{
        let {category,clickNum} =this.state
        f=='tag'? (category=i,this.getNews(i)):''
        f == 'title' ? clickNum!=i ? clickNum = i:clickNum=null : ''

        this.setState({
            category,
            clickNum
        })
    }
    handleScroll=()=>{
        if (this.scrollDom.scrollTop + this.scrollDom.clientHeight >= this.scrollDom.scrollHeight) {
            let {count} =this.state
            count=count+1
            this.setState({
                count
            })
            // ()=> this.getNews(this.state.category)
        }
    }
    render(){
        const {list,active,close,tag,news,clickNum,category,height} =this.state
        return (
            <div className="hot-words" style={{overflow:'hidden',height:height}}>
                {/* 热搜模块 */}
                {
                    (!close&&!isPhone())&&
                    <div style={styles.hotListBar}>
                        <div className="hot-list">
                            {/* 热搜来源名 */}
                            <h3 style={styles.hotListName}>
                                {
                                    list.map((res,i)=>(
                                        <nav key={i} 
                                            className={active==res.name?'active':null} 
                                            style={{fontSize:'13px'}}
                                            onClick={this.changeActive.bind(this,'name',res.name)} >
                                            {res.name}
                                        </nav>
                                    ))
                                }
                                {
                                    list.length&&
                                    <i style={{fontSize:'12px'}} className="fa fa-times"
                                        onClick={this.changeActive.bind(this,'close')}>
                                    </i>
                                }
                            </h3>
                            {/* 热搜标题内容 */}
                            <div style={{marginTop:'25px'}}>
                                {
                                    list.map((res, i) => (
                                        res.name==active
                                        &&res.data.map((item,j)=>(
                                            <p key={j} style={styles.hotItem}>
                                                {
                                                    j<3&&<code>♨️</code>
                                                }
                                                <a className={ j<3?('top3-'+j):'indent' } 
                                                target="_block" href={item.url}>
                                                    {item.title}
                                                </a>
                                            </p>
                                        ))
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                }
                {/* 内容展示模块 */}
                <div style={{overflow:'hidden',height:'100%'}}>
                    <div style={{width:'100px',float:'left',textAlign:'center',}}>
                        <div style={{width:'100%',marginTop:'100px'}}>
                            {
                                tag.map((res,i)=>(
                                    <nav key={i}
                                        className={category==res.category ? "active" : null}
                                        onClick={this.newClick.bind(this,'tag',res.category)}
                                    >
                                        { res.name }
                                    </nav>
                                ))
                            }
                        </div>
                    </div>

                    <div style={{overflow:'hidden',height:'100%'}}>
                        <div style={{overflow:'auto',height:'100%'}}
                            // onScroll={this.handleScroll.bind(this)} 
                            // ref={body=>this.scrollDom = body}
                        >
                            {
                                news.map((res,i)=>(
                                    // res.label !== '广告' &&
                                    <div key={i} style={{display:'flex',marginTop:'10px'}}>
                                        <div style={{flex:1}}>
                                        </div>
                                        <div style={{flex:1,height:'80px',margin:'20px'}}>
                                            <img style={{width:'100%',height:'100%'}} src={(res.middle_image&&res.middle_image.url)||res.media_info&&res.media_info.avatar_url} />
                                        </div>
                                        <div style={{flex:5,margin:'20px'}}>
                                            <h4 style={{color:'#218868',margin:'0',cursor:'pointer'}} 
                                            onClick={this.newClick.bind(this,'title',i)}>
                                            {
                                                !res.abstract?
                                                <a target="_block" href={'https://www.toutiao.com'+res.source_url}>{res.title}</a>:
                                                res.title
                                            }
                                            </h4>
                                            {
                                                // clickNum==i&&
                                                <article style={{width:'100%',fontSize:'14px'}}>
                                                    {res.abstract}
                                                    {res.abstract&&<a target="_block" href={res.display_url}>详情</a>}
                                                </article>
                                            }
                                        </div>

                                        <div style={{flex:1}}>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const styles={
    hotListBar:{
        width: '40%', 
        maxWidth: '250px', 
        marginTop: '3%', 
        marginRight: '10px', 
        float: 'right', 
        border: '1px solid #dedede',
        borderRadius:'5px'
    },
    hotListName:{
        display: 'flex', 
        margin: '15px 0', 
        alignItems: 'center', 
        justifyContent: 'space-around'
    },
    hotItem:{
        margin: '10px 2px', 
        paddingLeft: '10px', 
        textAlign: 'left'
    }
}
export default HotWords