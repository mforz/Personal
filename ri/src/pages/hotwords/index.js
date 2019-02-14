
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
        let path=['bdHot','sgHot','sinaHot']

        this.init(path)
    }
    init=(path)=>{
        let list =[]
        path.forEach((item,i) => {
            getFetch(API[item]).then((res)=>{

                if(item=='bdHot'){
                    let arr=[]
                    res.result.topwords.slice(0,10)
                    .forEach((res)=>{
                        arr.push({
                            title: res.keyword,
                            url: 'https://www.baidu.com/s?wd='+res.keyword
                        })
                    })
                    list.push({
                        name:'bdHot',
                        data:arr
                    })
                }
                if(item=='sgHot'){
                    let arr=[]
                    res.forEach((v)=>{
                        arr.push({
                            title: v.title,
                            url: 'https://www.sogou.com/web?query=' + v.title
                        })
                    })
                    list.push({
                        name:'sgHot',
                        data:arr
                    })
                }

                if(item=='sinaHot'){
                    let arr=[]
                    res.result.data.forEach((v) => {
                        arr.push({
                            title: v.title,
                            url: v.url,
                        })
                    })
                    list.push({
                        name:'sinaHot',
                        data:arr
                    })
                }

                // let data=[]
                // //清洗数据
                // item=='sgHot' ? data = res : ''
                // item=='bdHot' ? data = res.result.topwords:''
                // item=='sinaHot' ? data = res.result.data:''
                // list.push({
                //     name:item,
                //     data:data
                // })

                list.length==path.length
                &&this.setState({
                    list
                },()=>{console.log(list)})
                
            }).catch(err=>console.log(err))
        });
        
    }
    render(){
        const {list} =this.state
        return (
            <div className="hot-words">
               <div>
                   {
                       list.map((res,i)=>(
                           <div key={i}>
                            <span>{res.name}</span>
                            {
                                res.data.map((item,j)=>(
                                    <p key={j}>{item.title}</p>
                                ))
                            }
                           </div>
                       ))
                   }
                </div>
            </div>
        )
    }

}

export default HotWords