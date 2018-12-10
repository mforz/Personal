<template>
  <div class="home" :style="flag==2?style1:flag==1?style2:''">
  

    <Header @transBg="transBg"/>

    <div class="content" :style="!v?{visibility:'visible'}:{visibility:'hidden'}">
      <p style="font-size:1.4rem">站点功能</p>
      <div style="overflow:hidden">
        <span class="item" @click="handleClick('热词')">热词</span>
        <span class="item" @click="handleClick('天气')">天气</span>
        <span class="item" @click="handleClick('热搜')">新闻</span>
        <span class="item" @click="handleClick('小说')">小说</span>
      </div>
    </div>

    <Modal :show="loading" @close="loading=false">
      <div v-for="(item,i) in list" :key="i">
        <p style="text-align:center;cursor:pointer">
          <a target="_black" :data-href="'https://www.baidu.com/s?ie=UTF-8&wd='+item.keyword" @click="keyw=item.keyword,v=true,loading=!loading;">{{item.keyword}}</a>
          <i :title="data.length>0?data[i].content.data[0].description:''" class="fa fa-free-code-camp" aria-hidden="true"></i>
        </p>
      </div>
      <Loading :show="list.length==0" />
    </Modal>

    <div style="width:35%;margin:0 auto">
      <zFrame :show="v" :id="'news'" :src="'https://m.baidu.com/s?ie=UTF-8&wd='+keyw" :height="500" :bstyle="{maxWidth:'400px'}" @close="v=!v" @onload="load"/>
    </div>
   <Ip :src="'//pv.sohu.com/cityjson?ie=utf-8'" />
  </div>
</template>

<script>
import './index.css'
import Header from '@/pages/Header'
import Loading from '@/components/Loading'
import Modal from '@/components/Modal'
import zFrame from '@/components/Frame'
import Ip from '@/components/Remote'

export default {
  name:'Home',
  components:{
      Header,
      Loading,
      Modal,
      zFrame,
      Ip,
  },
  data(){
    return{
      data:'hello',
      t:false,
      loading:false,
      v:false,
      keyw:'',
      flag:2,
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
    init(){

    },
    handleClick(w){
      switch(w){
        case '热词':
          this.loading = true
          this.getData('http://localhost:2233/hotword')
        case '天气':
          this.loading = true
          this.getData('http://localhost:2233/weather')
      }
    },
    getData(url){
      fetch(url).then(res=>{return res.json()}).then(data=>{
         this.list=data.result.topwords.slice(0,9)
         this.data=data.result.descs
      }).catch()
    },
    load(){
        console.log('load success')
    },
    transBg(){
      this.flag==1?this.flag=2:this.flag=1
    }
  }
}
</script>

<style>

</style>
