<template>
    <div class="header">
        <div class="left">
            <h6 style="margin-top:20px">{{time}}</h6>
        </div>
        <div class="right">
            <div class="windmill" @click="animation">
                <img :class="!!anima?anima:''" :src="img" alt="小风车换壁纸" >
                <i></i>
            </div>
        </div>
    </div>
</template>

<script>
import './index.css'

export default {
    name:'Header',
    props:{
        data:{type:Object,required:false}
    },
    data(){
        return{
            img: require('@/assets/img/windmill.png'),
            time:null,
            timer:null,
            anima:'',
        }
    },
    mounted() {
        this.getTime()
    },
    methods:{
         getTime(){
             let date = new Date(),
             year= date.getFullYear(),
             month= date.getMonth()+1,
             day= date.getDate(),
             week= date.getDay().toString().replace('0','日')
             this.time=(`${year}年${month}月${day}日星期${week}`)
         },
         animation(){
             this.anima = 'anima'
             this.$emit('transBg')
             this.timer==null?
             this.timer = setTimeout(()=>{
                 this.anima=''
                 this.timer = null
             },3000):''
         }
    },
   
}
</script>

<style>

</style>
