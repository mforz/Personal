<template>
  <div class="home" :style="flag==2?style1:flag==1?style2:''">

    <Ip :src="'//pv.sohu.com/cityjson?ie=utf-8'" @load="getIp" />

    <Header @transBg="transBg"/>

    <Panel :visible="visible" @handleClick="handleClick" />

    <showDialog :show="show" @close="show=!show,model=-1" :model="model" :data="data" @sEmit="sEmit" :doc="doc" />
    
    <div style="width:35%;min-width:300px;margin:0 auto">
      <zFrame :show="!visible" :id="'news'" :src="'https://m.baidu.com/s?ie=UTF-8&wd='+keyw" :height="500" :bstyle="{ maxWidth:'400px'} " @close="visible=!visible" />
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
      keyw:'',
      doc:'',
      flag:2,
      model:0,
      data:[],
      class1:'',
      style1:{backgroundImage:'url(http://img5.imgtn.bdimg.com/it/u=79184341,555270766&fm=200&gp=0.jpg)'},
      style2:{backgroundImage: 'url("http://www.ruanyifeng.com/images_pub/pub_224.jpg")'},
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
        case 'zframe':
          this.show=false;this.visible=!this.visible;this.keyw=v
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

      }
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
      fetch('http://localhost:2233/hotword').then(res=>{return res.json()}).then(data=>{
          console.log(data)
         this.data = data.result.topwords.slice(0,20)
         this.doc = data.result.descs
      }).catch()
    },
    //每日一句
    oneWord(){
      fetch('http://localhost:2233/iciba-one').then(res=>{return res.json()}).then(data=>{
        console.log(data)
        this.data = data
      }).catch()
    },
    load(){},
    getIp(){
        // console.log('load success',window.returnCitySN)
    },
    transBg(){
      this.flag==1?this.flag=2:this.flag=1
    }
  }
}
</script>

<style>

</style>
