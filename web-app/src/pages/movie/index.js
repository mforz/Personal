
import React from 'react';
import API from '../../static/api';
import {getFetch} from '../../static/fetch.js'
import Input from '../../components/Input'
import { Sleep,Scroll,vipAPI,scriptLoad,removeDom} from '../../static/public';

/* eslint-disable */
const _404 =require('../../assets/loading.gif')
const sleep = new Sleep()
const scroll = new Scroll()

class Movie extends React.Component{
    constructor(props){
        super(props);
        this.state={
          tip:'输入-URL-解析VIP电影',
          data:[],
          word:'',
          total:0,
          start:0,
          i:0,
          qrcode:null,
        }
    }
    componentDidMount() {
        scriptLoad('qr', 'http://static.runoob.com/assets/qrcode/qrcode.min.js', () => {
          let qrcode = new QRCode(document.getElementById('qrcode'), {
            text: '',
            width: 256,
            height: 256,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
          });
          this.setState({qrcode})
        })
    }
    componentWillUnmount() {
      removeDom('qr')
    }

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

    setParma=( q )=>{
      let { word,data,start,url,qrcode,i}=this.state
      if(q.trim() && word !== q.trim() ){
        let reg = q.match(/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/)
        this.setState({
          tip:'正在搜索请稍等'
        })
        data = [],
        url='',start = 0
        word = q.trim()
        if ( reg && reg.length ) {
          url = reg[0]
          qrcode.makeCode(vipAPI(i)+url)
          let y= setTimeout(()=>{
            if (this.qrImg){
              let qr = document.getElementById('qrcode').lastChild.src
              this.qrImg.src = qr
            }
            clearTimeout(y)
          },1000)
        }
        this.setState({
        word,data,start,url
        },()=>{
          url==''? this.getMovie() :''
        })
      }
    }
    getMovie=() =>{
        // 输入url解析播放
        const {word,start} =this.state
        //输入名字查找电影资源
        getFetch(API.doubanMovie+`?q=${word}&start=${start}`).then((res)=>{
          let { data,tip } =this.state

          res&&res.subjects&&res.total
          ?(data = data.concat(res.subjects),tip=`关键词${word} 查找到 ${res.total} 条记录`)
          :tip='未找到资源'
          this.setState({
            data,tip,
            total:res.total
          })

        }).catch(err=>{
          this.setState({
            tip:'未知错误'
          })
        })
    }
    handleScroll=()=>{
      const {start,word,total} =this.state
      sleep.wait(()=>{
        if( word ){
          if( start+20 < total){
            this.setState ({
              start: start+ 20
            },()=>{this.getMovie()})
          }
        }
      },2000)
    }
    refresh= (e)=>{
      sleep.wait(()=>{
          e.persist()
          e.target.className = "fa fa-refresh fa-spin"
          const {qrcode}=this.state
          let i = this.state.i || 0
          let len = vipAPI().length-1
          i < len ? i = i+1 : i = 0
          this.setState({ i })
          qrcode.makeCode(vipAPI(i) + this.state.url)
          let x = setTimeout(()=>{
              e.target.className = "fa fa-refresh"
               if (this.qrImg) {
                 let qr = document.getElementById('qrcode').lastChild.src
                 this.qrImg.src = qr
               }
              clearTimeout(x)
          },2000)
      },2500)
    }
    
    render(){
      const path = "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
      const {data,tip,url,i} =this.state
       return(
         <div className="movie" style={{width:'100%',height:'100%'}}>
           <meta name="referrer" content="no-referrer"/>
           <div id="qrcode"></div>
            <header style={{width:'100%',height:'70px',overflow:'hidden'}}>
              <Input clear={false} 
                style={styles.inputBar}
                enter={this.setParma}
                placeholder = "URL地址、电影、剧集、动漫、节目 ..."
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
              <main style={{padding:'0 30px',height:'88%',overflow:'hidden'}}>
                <div style={styles.tip}>
                    <p className="p" style={{fontSize:'13px',color:'#444',margin:'0 12px'}}>{tip}</p>
                </div>
                <div className="movie-main" 
                  style={{overflow:'auto',height:'90%'}}
                  ref={body=>this.dom=body} 
                  onScroll={()=>{scroll.to(this.dom,this.handleScroll)}}
                >
                  {
                    !!data.length&&
                    data.map((res,i)=>(
                      <div key={i} style={styles.card}>
                        {/* left */}
                        <div style={{flex:0.3,marginLeft:'-5px',justifyContent:'center',color:'#f4b58e',alignItems:'center'}}>
                          <span style={{textDecoration:'underline',fontSize:'13px'}}>
                            {i+1}
                          </span>
                        </div>
                        <div style={{flex:2,}}>
                          <img style={{width:'100%',height:'100%'}} 
                            src={res.images&&res.images.small}
                            onError={(e)=>{e.target.src=_404}} />
                        </div>
                        {/* right */}
                        <div style={{flex:9,padding:'0 20px',overflow:'hidden'}}>
                            <p className="p" style={{textDecoration:'underline'}}>
                                <a target="_block" href={res.alt}>
                                {`${res.title} (${res.original_title})`}
                                </a>
                                <span style={{margin:'0 15px',color:'#55f6f7'}}>
                                  {`${res.year}`}
                                </span>
                            </p>
                            <p style={{margin:'10px 0',fontSize:'12px'}}>
                              <span>
                                {!!res.genres.length&&'类型：'}
                                {res.genres.join('、')}
                              </span>
                              <br/>
                              <span>
                                {!!res.directors.length&&'导演：'}
                                {
                                  !!res.directors.length&&
                                   res.directors.map((d)=>(
                                    d ? d.name +'、':null
                                  ))
                                }
                              </span>
                              <br/>
                              <span>
                                {!!res.casts.length&&'主演：'}
                                {
                                  !!res.casts.length
                                  && res.casts.map((d)=>(
                                    d? d.name+'、' :null
                                  ))
                                }
                              </span>
                          </p>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </main>
              :<div style={{width:'90%',height:'80%',margin:'0 auto'}}>
                <p style={{fontSize:'13px',color:'#444',margin:'10px 0'}}>
                  <span style={{margin:'0 10px'}}>不能播放？点我试试</span>
                  <i className="fa fa-refresh" onClick={(e)=>{this.refresh(e)}}></i>
                  <span style={{margin:'0 40px'}}>
                    <i className="fa fa-qrcode" aria-hidden="true" onMouseOver={this.qrPlay}></i>
                    <img className="qr-item" ref={(body)=>{this.qrImg=body}} style={{position:'absolute',width:'200px',height:'200px',margin:'0 20px'}} src="" />
                  </span>
                </p>
                <iframe id="player" width="100%" height="100%" frameBorder="0" 
                  allowtransparency="true" allowFullScreen={true} scrolling="no"
                  src={vipAPI(i)+url} >
                </iframe>
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
      height: '40px',
      fontSize:'12px',
      margin: '0 auto',
      overflow:'hidden',
  },
  card:{
    width: '90%', 
    maxWidth: '600px', 
    height: '100px', 
    margin: '20px auto',
    padding: '15px 10px',
    display:'flex',
    borderRadius: '6px',
    backgroundColor: '#fff',
    alignItems:'center',
    overflow:'hidden',
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