<template>
  <div class="home" :style="flag==2?style1:flag==1?style2:''">
    <div class="content">
      <p style="font-size:1.4rem">站点功能</p>
      <div style="overflow:hidden">
        <span class="item">娱乐</span>
        <span class="item">新闻</span>
        <span class="item">软件</span>
        <span class="item">软件</span>
        <span class="item">软件</span>
        <span class="item">软件</span>
        <span class="item">软件</span>
        <span class="item">软件</span>
        <span class="item">软件</span>
        <span class="item">软件</span>
        <span class="item">软件</span>
        <span class="item">软件</span>
        <span class="item">软件</span>
        <span class="item">软件</span>
      </div>
    </div>

    <div class="fun">
      <div class="windmill">
       <img :src="img" alt="小风车换壁纸" :style="{transform:'rotate(360deg)'}">
       <i></i>
      </div>
    </div>

    <!-- <div class="fun">
      <div class="switch">
        <span :class="flag==1?'active':''" @click="flag=1">换</span>
      </div>
    </div> -->

  </div>
</template>

<script>
import './index.css'
export default {
  name:'Home',
  data(){
    return{
      data:'hello',
      flag:2,
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
    let q = {
        method: "GET",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        host: 'top.baidu.com',
        referer: 'http://top.baidu.com/m/',
    }
    fetch('',q).then(res=>{return res.json()}).then(data=>{
      console.log(data)
    }).catch(err=>{
      console.log(err)
    })
  },
}
</script>

<style>

</style>
