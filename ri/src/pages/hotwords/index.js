
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
                let data=[]

                //清洗数据
                item=='sgHot'? data = res : ''
                item=='bdHot'? data = res.result.topwords:''
                item=='sinaHot'? data = res.result.data:''


                list.push({
                    name:item,
                    data:data
                })
                
                i+1==path.length
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
                       list.map((res)=>(
                           <p>
                           {
                               res.title
                            }
                            </p>
                       ))
                   }
                </div>
            </div>
        )
    }

}

export default HotWords