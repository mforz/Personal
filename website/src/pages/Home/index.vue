<template>
  <div class="home" :style="flag==2?style1:flag==1?style2:''">
  
    <div class="content">
      <p style="font-size:1.4rem">站点功能</p>
      <div style="overflow:hidden">
        <span class="item" @click="handleClick('热词')">热词</span>
        <span class="item" @click="handleClick('新闻')">新闻</span>
        <span class="item" @click="handleClick('小说')">小说</span>
      </div>
    </div>

    <div class="fun">
      <div style="width:120px;position:relative;height:100%;">
          <Loading :show="loading" />
      </div>
      <div class="windmill">
       <img :src="img" alt="小风车换壁纸" :style="{transform:'rotate(360deg)'}" @click="loading=!loading">
       <i></i>
      </div>
    </div>
    <Modal :show="loading" @close="loading=false">
      <div v-for="(item,i) in list" :key="i">
        <p>
          <a target="_black" :href="'https://www.baidu.com/s?ie=UTF-8&wd='+item.keyword">{{item.keyword}}</a>
        </p>
      </div>
    </Modal>
    <!-- <div class="fun">
      <div class="switch">
        <span :class="flag==1?'active':''" @click="flag=1">换</span>
      </div>
    </div> -->

  </div>
</template>

<script>
import './index.css'
import Loading from '@/components/Loading'
import Modal from '@/components/Modal'

export default {
  name:'Home',
  components:{
    Loading,
    Modal,
  },
  data(){
    return{
      data:'hello',
      loading:false,
      flag:2,
      list:[],
      class1:'',
      img:require('@/assets/img/windmill.png'),
      style1:{
        backgroundImage:'url(http://img5.imgtn.bdimg.com/it/u=79184341,555270766&fm=200&gp=0.jpg)'
      },
      style2:{
        backgroundImage: 'url("http://www.ruanyifeng.com/images_pub/pub_224.jpg")'
      }
    }
  },
  mounted() {
    // fetch('http://localhost:2233/hotword').then(res=>{return res.json()}).then(data=>{
    //   console.log(data)
    //   this.list=data.result.topwords.slice(0,9)
    // }).catch(err=>{
    //   console.log(err)
    // })
  },
  methods:{
    init(){

    },
    handleClick(w){
      switch(w){
        case '热词':
          this.loading = true
          this.getData('http://localhost:2233/hotword')
      }
    },
    getData(url){
      fetch(url).then(res=>{return res.json()}).then(data=>{
         this.list=data.result.topwords.slice(0,9)
      }).catch()
    }
  }
}
</script>

<style>

</style>
