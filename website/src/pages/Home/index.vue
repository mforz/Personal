<template>
  <div class="home" :style="{backgroundImage:styleUrl}">
   
    <Ip :src="'//pv.sohu.com/cityjson?ie=utf-8'" @load="getIp" />

    <Header @transBg="rdWallpaper"/>

    <Panel :visible="visible" @handleClick="handleClick" />

    <showDialog :show="show" @close="show=!show,model=-1" :model="model" :data="data" @sEmit="sEmit" :doc="doc" :flag="i" />
    
    <div style="width:35%;min-width:300px;margin:0 auto">
      <zFrame :show="!visible" :id="'news'" :src="src" :height="500" :bstyle="{ maxWidth:'400px'} " @close="visible=!visible" />
    </div>

  </div>
</template>

<script>
import './index.css'
import Header from '@/pages/Header'
import Panel from './panel'
import showDialog from './modal'
import zFrame from '@/components/Frame'
import Ip from '@/components/Remote'


export default {
  name:'Home',
  components:{
    showDialog,
    zFrame,
    Header,
    Panel,
    Ip,
  },
  data(){
    return{
      show:false,
      visible:true,
      i:0,//bd,sg
      src:'',
      doc:'',
      audio:null,
      page:1,
      model:0,
      data:[],
      class1:'',
      styleUrl:'',
    }
  },
  mounted() {
    this.oneWord()
  },
  methods:{
    sEmit(flag,v){
      switch(flag){
        case 'trans':
          this.trans()
        break
        case 'bd':
          this.data = []
          this.i= 0
          this.getHotWards()
        break
        case 'sg':
          this.data = []
          this.i= 1
          this.getHotWards()
        break
        case 'sina':
          this.data = []
          this.i= 2
          this.getHotWards()
        break
        case 'zframe':
          this.show=false;
          this.visible=!this.visible;
          this.i==0?
          this.src=`https://m.baidu.com/s?ie=UTF-8&wd=${v}`:
          this.i==1?
          this.src=`https://wap.sogou.com/web/searchList.jsp?keyword=${v}`:
          this.src=`https://m.weibo.cn/search?containerid=100103type=1&q=${v}`
       break
       case 'oneAudio':
       console.log(v)
        this.oneAudio(v);
       break

      }

    },
    handleClick(w){
      switch(w){
        case '热词':
          this.model=1
          this.data = []
          this.show = true
          this.getHotWards()
        break
        case '翻译':
          this.show = true
          this.model=2
          this.data = []
        break
        case '天气':
          this.show = true
          this.data = []
           this.model=3
          this.weather()
        break
        case '一句':
          this.model=4
          this.oneWord()
          this.data = []
          this.show = true
        break
        case '待办':
          this.model=5
          this.data = []
          this.show = true
        break
        case '电影推荐':
          this.model=6
          this.data = []
          this.show = true
          this.movie250()
        break
        case '罗辑思维':
          this.model=7
          this.data = []
          this.show = true
          this.luoji()
        break

      }
    },
    oneAudio(url){
        this.audio==null?this.audio=new Audio():''
        this.audio.src=url
        this.audio.paused?this.audio.play():this.audio.pause()
      },
      //随机壁纸
      rdWallpaper(){
            fetch(`http://localhost:2233/rd-wallpaper`).then(res=>{ return res.json()}).then(data=>{
                this.styleUrl= `url(${data.data[0].src.originalSrc})`
            }).catch(error=>{
                console.log(error)
            })
        },
    // 天气
    weather(){
      var arr,reg=new RegExp("(^| )weathe=([^;]*)(;|$)"); //正则匹配
      if(arr=document.cookie.match(reg)){
        this.data=JSON.parse(arr[2]);
        // return true
      }else{
         fetch('http://localhost:2233/he-weather/&location='+(!!window.returnCitySN?window.returnCitySN.cip:'')).then(res=>{return res.json()})
        .then(res=>{
          this.data = res.HeWeather6[0]
          let exp = new Date();
          exp.setTime(exp.getTime() + 300*1000);//5分钟
          document.cookie="weathe="+JSON.stringify(this.data)+";expires="+exp.toGMTString();
          return true
        }).catch()
      }
     
    },
    // 翻译
    trans(){
      this.transfrom=[]
      let dom = document.getElementById('trans-input')
      fetch('http://localhost:2233/youdao/&i='+dom.value).then(res=>{return res.json()})
      .then(res=>{
       this.data=!!res?res.translateResult:''
      }).catch()

    },
    // 热词
    getHotWards(){
      let url=['bd-hotword','sg-hotword','sina-hotword']
      fetch(`http://localhost:2233/${url[this.i]}`).then(res=>{return res.json()}).then(data=>{
         this.i==0?this.data =data.result.topwords.slice(0,20): this.i==1?this.data = data:this.data = data.result.data
         this.i==0?this.doc =  data.result.descs:''

      }).catch()
    },
    //每日一句
    oneWord(){
      fetch('http://localhost:2233/iciba-one').then(res=>{return res.json()}).then(data=>{
        this.data = data
      }).catch()
    },
    luoji(){
      fetch(`http://localhost:2233/luoji/page/${this.page}/pagesize/10`).then(res=>{return res.json()}).then(data=>{
        console.log(data)
        this.data = data.data
      }).catch()
    },
    movie250(){
      fetch(`http://localhost:2233/movie250`).then(res=>{return res.json()}).then(data=>{
        console.log(data)
        this.data = data.subjects
      }).catch()
    },

    load(){},
    getIp(){
        // console.log('load success',window.returnCitySN)
    },
  }
}
</script>

<style>

</style>
