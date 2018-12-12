<template>
  <div class="home" :style="flag==2?style1:flag==1?style2:''">
  <Ip :src="'//pv.sohu.com/cityjson?ie=utf-8'" @load="getIp" />
    <Header @transBg="transBg"/>

    <div class="content" :style="!v?{visibility:'visible'}:{visibility:'hidden'}">
      <p style="font-size:1.4rem">站点功能</p>
      <div style="overflow:hidden">
        <span class="item" @click="handleClick('热词')">热词</span>
        <span class="item" @click="handleClick('天气')">天气</span>
        <span class="item" @click="handleClick('翻译')">翻译</span>
        <span class="item" @click="handleClick('小说')">小说</span>
      </div>
    </div>

    <Modal :show="show" @close="show=false">

      <div v-if="model==1" v-for="(item,i) in list" :key="i">
        <p style="text-align:center;cursor:pointer">
          <a target="_black" @click="keyw=item.keyword,v=true,show=!show;">{{item.keyword}}</a>
          <i :title="data.length>0?data[i].content.data[0].description:''" class="fa fa-free-code-camp" aria-hidden="true"></i>
        </p>
      </div>

      <div v-if="model==2" >
        <p style="text-align:center">
          <input id="trans-input" class="input" type="search" placeholder="需要翻译单词/汉语"  @keyup.enter="trans">
        </p>
        <div>
          <p v-for="(item,i) in transfrom" :key="i" style="text-align:center">
            <a v-show="item[0].src">{{item[0].src}}:{{item[0].tgt}} </a>
          </p>
        </div>
      </div>

      <div v-if="model==3" >
        <p style="text-align:center">{{weathe.basic.cnty+"-"+weathe.basic.location}}</p>
        <div style="padding-left:20px">
          <p>现在天气:{{weathe.now.cond_txt}}，温度:{{weathe.now.tmp}} ℃</p>
          <p>风向:{{weathe.now.wind_dir}}，风力:{{weathe.now.wind_sc}}，风速:{{weathe.now.wind_spd}} km/h</p>
        </div>

      </div>

      <Loading :show="list.length==0 && model!==2 && !!weather.now" />

    </Modal>

    <div style="width:35%;margin:0 auto">
      <zFrame :show="v" :id="'news'" :src="'https://m.baidu.com/s?ie=UTF-8&wd='+keyw" :height="500" :bstyle="{maxWidth:'400px'}" @close="v=!v" @onload="load"/>
    </div>

  </div>
</template>

<script>
import './index.css'
import Header from '@/pages/Header'
import Loading from '@/components/Loading'
import Modal from '@/components/Modal'
import zFrame from '@/components/Frame'
import iView from '@/components/View'
import Ip from '@/components/Remote'

export default {
  name:'Home',
  components:{
      Header,
      Loading,
      Modal,
      zFrame,
      Ip,
      iView
  },
  data(){
    return{
      data:'hello',
      t:false,
      show:false,
      transfrom:null,
      v:false,
      keyw:'',
      weathe:{},
      flag:2,
      model:0,
      list:[],
      data:[],
      class1:'',
      style1:{backgroundImage:'url(http://img5.imgtn.bdimg.com/it/u=79184341,555270766&fm=200&gp=0.jpg)'},
      style2:{backgroundImage: 'url("http://www.ruanyifeng.com/images_pub/pub_224.jpg")'},
    }
  },
  mounted() {
    
  },
  methods:{
    handleClick(w){
      switch(w){
        case '热词':
          this.show = true
          this.model=1
          this.getHotWards('http://localhost:2233/hotword')
        break
        case '翻译':
          this.show = true
          this.model=2
        break
        case '天气':
          this.weather()
          this.show = true
          this.model=3
        break
      }
    },
    weather(){
      var arr,reg=new RegExp("(^| )weathe=([^;]*)(;|$)"); //正则匹配
      if(arr=document.cookie.match(reg)){
        this.weathe=JSON.parse(arr[2]);
        return
      }
      fetch('http://localhost:2233/he-weather/&location='+(!!window.returnCitySN?window.returnCitySN.cip:'')).then(res=>{return res.json()})
      .then(res=>{
        this.weathe = res.HeWeather6[0]
        let exp = new Date();
        exp.setTime(exp.getTime() + 300*1000);//5分钟
        document.cookie="weathe="+JSON.stringify(this.weathe)+";expires="+exp.toGMTString();
        
      }).catch()
    },
    trans(){
      this.transfrom=[]
      let dom = document.getElementById('trans-input')
      fetch('http://localhost:2233/youdao/&i='+dom.value).then(res=>{return res.json()})
      .then(res=>{
       this.transfrom=!!res?res.translateResult:''
      }).catch()

    },
    getHotWards(url){
      fetch(url).then(res=>{return res.json()}).then(data=>{
         this.list=data.result.topwords.slice(0,9)
         this.data=data.result.descs
      }).catch()
    },
    load(){},
    getIp(){
        console.log('load success',window.returnCitySN)
    },
    transBg(){
      this.flag==1?this.flag=2:this.flag=1
    }
  }
}
</script>

<style>

</style>
