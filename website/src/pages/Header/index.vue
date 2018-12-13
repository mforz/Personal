<template>
    <div class="header">
        <div class="left">
            <!-- <a href="javascript:void(0)">{{data.one?data.one.content:''}}</a> -->
        </div>
        <div class="right">
            <div class="windmill" @click="$emit('transBg')">
                <img :src="img" alt="小风车换壁纸" >
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
        }
    }
}
</script>

<style>

</style>
