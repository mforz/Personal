
import React from 'react';
import API from '../../static/api';
import {getFetch} from '../../static/fetch.js'
import Input from '../../components/Input'
// import { setStorage,getStorage } from '../../static/public';

/* eslint-disable */
const _404 =require('../../assets/404.jpg')

class Movie extends React.Component{
    constructor(props){
        super(props);
        this.state={
          tip:'输入关键词搜索',
          data:{ }
        }
    }
    componentDidMount(){}
    init=(url)=>{
       getFetch(API.movieVip + '?url=' + url).then((res) => {
        console.log(res)
       }).catch(err => {
         // console.log(err)
         this.setState({
           tip: '未知错误'
         })
       })
    }
    getMovie=(q)=>{
      this.setState({
        tip:'正在搜索请稍等'
      })
     let reg =q.match(/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/)
     if (reg&&reg.length) {
       this.init(reg[0])
       return
     }
      getFetch(API.doubanMovie+'?q='+q).then((res)=>{
        this.setState({
          data:res,
          tip:res.total?'':'未找到资源'
        })
      }).catch(err=>{
        // console.log(err)
        this.setState({
          tip:'未知错误'
        })
      })
    }
    
   
    render(){
      const path = "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
      const {data,tip,url} =this.state
      
       return(
         <div className="movie">
           <meta name="referrer" content="no-referrer"/>
            <header style={{width:'100%',height:'100px',overflow:'hidden'}}>
              <Input clear={false} 
                style={styles.inputBar}
                enter={this.getMovie}
                placeholder = "电影、剧集、动漫、节目 ..."
                inputStyle={{border:'none',width:'85%',padding:0,}}
              >
                {/* search icon */}
                <i style={styles.search}>
                  <svg focusable="false" viewBox="0 0 24 24"
                    xmlns = "http://www.w3.org/2000/svg">
                    <path d={path} fill="#DB542F"></path>
                  </svg>
                </i>
              </Input>
            </header>

            {
              !url?
              <main style={{padding:'0 30px'}}>
                <div style={styles.tip}>
                    <span style={{fontSize:'13px',color:'#444',margin:'0 12px'}}>{data.total?data.title:null}</span>
                    <span style={{fontSize:'13px',color:'#444',}}>{data.total?`共${data.total||0}条`:tip}</span>
                </div>
                <div>
                  {
                    data.subjects&&
                    data.subjects.map((res,i)=>(
                      <div key={i} style={styles.card}>
                        {/* left */}
                        <div style={{flex:'1',height:'70px',}}>
                          <img style={{width:'100%',height:'100%'}} src={res.images&&res.images.small} onError={(e)=>{e.target.src=_404}} />
                        </div>
                        {/* right */}
                        <div style={{flex:'9',padding:'0 20px',overflow:'hidden'}}>
                            <p className="p" style={{textDecoration:'underline'}}>
                                <a target="_block" href={res.alt}>
                                {`${res.title} (${res.original_title})`}
                                </a>
                            </p>
                            <p style={{margin:'10px 0',fontSize:'12px'}}>
                              <span>{res.genres.join('、')}</span>
                              <span style={{margin:'0 15px',color:'#55f6f7'}}>
                                {`${res.year}`}
                              </span>
                          </p>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </main>
              :<div>
                <video autoPlay preload="metadata" playsInline src={url}>
                </video>
              </div>
            }
         </div>
       )
    }
}
const styles={
  tip:{
      width: '90%',
      maxWidth: '600px',
      height: '60px',
      margin: '0 auto',
      // padding: '15px 10px',
  },
  card:{
    width: '90%', 
    maxWidth: '600px', 
    height: '60px', 
    margin: '20px auto',
    padding: '15px 10px',
    display:'flex',
    borderRadius: '6px',
    backgroundColor: '#fff',
    // justifyContent:'center',
    alignItems:'center',
    boxShadow: '0 4px 15px 0 #ddd'
  },
  inputBar:{
    width: '50%',
    height: '32px', 
    margin: '20px auto', 
    border: '1px solid #ccc', 
    borderRadius: '3px'
  },
  search:{
    width: '30px', 
    height: '30px', 
    position: 'absolute', 
    right: '10px', top: '50%', 
    transform: 'translateY(-50%)'
  }
}

export default Movie