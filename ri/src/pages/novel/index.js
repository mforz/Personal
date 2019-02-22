
import React from 'react';
import Input from '@/components/Input/'
import {getCookie,getTime,setStorage,getStorage} from '@/static/public.js'
import API from '../../static/api';
import {getFetch,postFetch} from '@/static/fetch.js'
// import './index.css'
/* eslint-disable */

class Essay extends React.Component{
    constructor(props){
        super(props);
        this.state={
          ul:[],
          nav:{},
          newest:{},
          data:[],
        }
    }
    componentDidMount(){
        let dom = document.getElementById('bg')
        let height= document.body.clientHeight-dom.clientHeight
        this.setState({
            height
        })
        this.init()
    }
    
    init=()=>{
        getFetch(API.test,{type:'text'}).then((res)=>{

            let ul = res.match(/<ul(([\s\S])*?)<\/ul>/g)
            let first = ul[0]
            let last = ul[ul.length-1]

            let nav ={
                name:first.match(/[\u4E00-\u9FA5]{2,4}/g),
                url:first.match(/(?<=")(.*?)(?=")/g),
            }
            nav.name.shift()
            nav.url.shift()
            nav.name.pop()
            nav.url.pop()

            let newest ={
                tag:last.match(/\[(.*?)\]/g),
                name:last.match(/(?<=\/">)(.*?)(?=<\/a)/g),
                url:last.match(/(?<=href=")(.*?)(?=")/g),
            }

            this.setState({
                nav,newest
            })

        }).catch()
    }

    getNovel =(url)=>{

        getFetch(API.test+url,{type:'text'}).then((res)=>{

            let ul = res.match(/<ul(([\s\S])*?)<\/ul>/g)
            let last = ul[ul.length-1]
            
            let data ={
                tag : last.match(/\[(.*?)\]/g),
                url : last.match(/(?<=href=")(.*?)(?=")/g),
                title : last.match(/(?<=\/">)(.*?)(?=<\/a)/g),
                author : last.match(/(?<=s5">)(.*?)(?=<\/span)/g),
            }

            this.setState({
                data
            })

        }).catch(err=>{
            console.log(err)
        })
    }

    handleClick=(i)=>{
        const {nav,ul} = this.state
        let url = nav.url[i]
        this.getNovel(url)
        // let last = ul[ul.length-1]
        // let tag = last.match(/\[(.*?)\]/g)
        // let url = last.match(/(?<=href=")(.*?)(?=")/g)
        // let title = last.match(/(?<=\/">)(.*?)(?=<\/a)/g)
        // let newest ={
        //     tag,url,title
        // }
        // this.setState({
        //     newest
        // })
    }
   
    render(){
        const {data,height,nav,newest,menu,isExcerpt,excerpt} =this.state
        return (
            <div className="novel" style={{height:height,overflow:'auto',}}>
                <header style={{width:'100%'}}>
                    <div style={{width:'100%',maxWidth:'700px',margin:'20px auto',display:'flex',color:'#8B5A00',justifyContent:'space-around'}}>
                        {
                            nav.name&&
                            nav.name.map((res,i)=>(
                                <nav key={i} onClick={this.handleClick.bind(this,i)}>{res}</nav>
                            ))
                        }
                    </div>
                </header>

                <main style={{overflow:'auto'}}>
                    {
                        newest.name&&
                        newest.name.map((res,i)=>(
                            <div key={i}>
                                <span>{newest.tag[i]}</span>
                                <span> {res} </span>
                            </div>
                        ))
                    }
                    {
                        data.length&&
                        data.map((res,i)=>(
                            <div>{res}</div>
                        ))

                    }
                </main>
            </div>
        )
    }
}
const styles={
    
}

export default Essay