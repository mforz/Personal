
import React from 'react';
import API from '../../static/api';
import {getFetch} from '../../static/fetch.js'
import Input from '../../components/Input'
import { Sleep,Scroll,apiData,scriptLoad,removeDom} from '../../static/public';

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
      //加载二维码js，初始化二维码
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
    //卸载页面，移除二维码js
    componentWillUnmount() {
      removeDom('qr')
    }
    //enter准备搜索
    setParma=( q )=>{
    const { qrcode,i,word } = this.state
    let url = ''
      if(q.trim() && word !== q.trim() ){
        let reg = q.match(/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/)
        this.setState({tip:'正在搜索请稍等'})

        if ( reg && reg.length ) {
          url = reg[0]
          qrcode.makeCode(apiData('vip')[i]+ url)
          let y = setTimeout(()=>{
            if (this.qrImg){
              let qr = document.getElementById('qrcode').lastChild.src
              this.qrImg.src = qr
            }
            clearTimeout(y)
          },1000)
        }
        
        this.setState({
          url,
          start:0,
          word:q,
          data:[],
        },()=>{ url==''  ? this.getMovie() : '' })

      }
    }
    // 搜索电影
    getMovie =() =>{
        const { word,start } =this.state
        //输入名字查找电影资源
        getFetch(API.doubanMovie+`?q=${word}&start=${start}`).then((res)=>{
          const { data } =this.state
          let tip = '',d = []

          res && res.subjects && res.total
          ?(d = data.concat(res.subjects), tip=`关键词${word} 查找到 ${res.total} 条记录`)
          :tip='未找到资源'

          this.setState({
            tip,
            data:d,
            total:res.total
          })

        }).catch(err=>{
          this.setState({
            tip:'未知错误',
            data:[]
          })
        })
    }
    //滚动事件
    handleScroll=()=>{
    const { start, word, total} = this.state
      sleep.wait(()=>{
        if( word ){
          if( start + 20 < total){
            this.setState ({
              start: start+ 20
            },()=>{this.getMovie()})
          }
        }
      },2000)
    }
    //刷新，换源
    refresh= (e)=>{
      sleep.wait(()=>{
      const { qrcode } = this.state
      let i = this.state.i || 0
      let len = apiData('vip').length - 1

          e.persist()
          e.target.className = "fa fa-refresh fa-spin"
          //改变源
          i < len ? i = i+1 : i = 0
          this.setState({ i })
          //生成二维码
          qrcode.makeCode(apiData('vip')[i] + this.state.url)
          //改变二维码
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
      const {data,tip,url,i} =this.state
       return(
         <div className="movie" style={{width:'100%',height:'100%'}}>
           <meta name="referrer" content="no-referrer"/>
           <div id="qrcode"></div>

            <header style={{width:'100%',height:'70px',overflow:'hidden'}}>
              <Input clear={false} search
                style={styles.inputBar}
                enter={this.setParma}
                placeholder = "URL地址、电影、剧集、动漫、节目 ..."
                inputStyle={{border:'none',width:'85%',padding:0,}} 
              />
            </header>

            {
              //非url搜索电影
              !url ?
              <main style={{padding:'0 30px',height:'88%',overflow:'hidden'}}>
                <div style={styles.tip}>
                    <p className="p" style={{fontSize:'13px',color:'#444',margin:'0 12px'}}>{tip}</p>
                </div>

                <div className="movie-main scroll" 
                  style={{overflow:'auto',height:'90%'}}
                  ref={body=>this.dom=body} 
                  onScroll={()=>{scroll.to(this.dom,this.handleScroll)}}
                >
                  {
                    !!data.length&&
                    data.map((res,i)=>(
                      <div key={i} style={styles.card}>
                        {/* left */}
                        <div style={{flex:0.3,display:'flex',color:'#f4b58e',alignItems:'center'}}>
                          <span style={{textDecoration:'underline',fontSize:'13px'}}>
                            {i+1}
                          </span>
                        </div>

                        <div style={{flex:2}}>
                          <img style={{width:'100%',height:'100%'}} 
                            src={!!res.images && res.images.small}
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
              </main>:
              //url播放解析视频
              <div style={{width:'90%',height:'80%',margin:'0 auto'}}>
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
                  src={apiData('vip')[i]+url} >
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