<template>
  <div class="home" :style="flag==2?style1:flag==3?style2:''">
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
      <div class="switch">
        <span :class="flag==1?'active':''" @click="flag=1">关</span>
        <span :class="flag==2?'active':''" @click="flag=2">开</span>
        <span :class="flag==3?'active':''" @click="flag=3">换</span>
      </div>
    </div>
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
      style1:{
        backgroundImage:'url(http://img5.imgtn.bdimg.com/it/u=79184341,555270766&fm=200&gp=0.jpg)'
      },
      style2:{
        backgroundImage: 'url("http://www.ruanyifeng.com/images_pub/pub_224.jpg")'
      }
     
    }
  },
  mounted() {
    console.log('1')
  },
}
</script>

<style>

</style>
