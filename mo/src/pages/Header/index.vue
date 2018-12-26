<template>
    <div class="header">
        <div class="header-1">
            <span v-show="!!weather.city">
                {{weather.city}}:
                <img :src="weather.img"/>
                {{weather.condition}} 
                {{weather.temp}} 
                {{weather.wind}}
            </span>|
            <span class="h-clock" @click="show=!show">
                时间
            </span>|
            <span class="h-clock" @click="is=!is">
                当前网速
            </span>

            <span v-if="show">
                <Clock  />
            </span>
            <span v-if="is" style="">
                <iframe src="https://fast.com/" width="100" border="0" />
            </span>
        </div>
        <div class="header-2">

        </div>
    </div>
</template>

<script>
import './index.css'
import Clock from '@/components/Clock'

export default {
    name:'Header',
    props:{
        weather:{type:Object, required:true}
    },
    components:{
        Clock
    },
    data(){
        return{
            show:false,
            is:false,
        }
    }

}
</script>
