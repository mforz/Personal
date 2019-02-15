
import React from 'react';
// import Input from '@/components/Input/'
import {getCookie,goTo,setStorage,getStorage} from '@/static/public.js'
import API from '@/static/api.js'
import {getFetch} from '@/static/fetch.js'

/* eslint-disable */

class HotWords extends React.Component{
    constructor(props){
        super(props);
        this.state={
            list:[]
        }
    }
    componentDidMount(){
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
        this.init(path)
        this.news(tag)
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
                console.log(item,res)

                let arrEach= null, name='',arr=[]
                //数据清洗构造
                item==='bdHot' ? (name='百度热搜♨️', arrEach=res.result.topwords.slice(0,10)||[]) : ''
                item==='sgHot' ? (name='搜狗热搜♨️', arrEach=res||[]) : ''
                item=='sinaHot'? (name='新浪热搜♨️', arrEach=res.result.data||[]) : ''
                item==='wbHot' ? (name='微博热搜♨️', arrEach=JSON.parse(res.match(/\[(.*)\]/)[0])||[]) : ''
                //遍历数据，构造object
                arrEach.forEach((res)=>{
                    arr.push({
                        title: res.keyword || res.title || res.word,
                        url: serach[item] + (res.keyword||res.title||res.word.replace('#',''))
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
                })
            }).catch(err=>{
                // console.log(err,list)
                //请求失败 存入state
                this.setState({
                    list
                })
            })
        });
    }

    news=(tag)=>{
        getFetch(API.ttNews+`?category=${tag[9].category}&max_behot_time=0`).then((res)=>{
            console.log(res)
        })
    }
    render(){
        const {list} =this.state
        return (
            <div className="hot-words">
               <div style={{marginTop:'30px'}}>
                   {
                       list.map((res,i)=>(
                           <div key={i} style={styles.list}>
                                <div style={styles.item}>
                                    <p style={{textAlign:'center'}}> 
                                        {res.name}
                                    </p>
                                    {
                                        res.data.map((item,j)=>(
                                            <p key={j} style={styles.title}>
                                                <a className={j<=3&&'top3-'+j} target="_block" href={item.url}>{item.title}</a>
                                            </p>

                                        ))
                                    }
                                </div>
                           </div>
                       ))
                   }
                </div>
            </div>
        )
    }
}
const styles={
    list:{
        width:'25%',
        float:'left',
    },
    item:{
        width:'90%',
        maxWidth:'150px',
        margin:'0 auto',
       
    },
    title:{
        margin:'8px auto',
        fontSize:'14px',
    }
}
export default HotWords