<template>
    <div class="home">
        <mHeader :weather="weather" />
        <Ip :src="'//pv.sohu.com/cityjson?ie=utf-8'" @load="getIp" />
        
         <router-view />
    </div>
</template>


<script>
import mHeader from '@/pages/Header/'
import Ip from '@/components/Remote/'
import getData from '@/static/Fetch/'
import Main from '@/pages/Main/'

export default {
    name:'Home',
    components:{
      mHeader,
      Ip,
      Main
    },
    data(){
        return {
            weather:{}
        }
    },
    mounted() {

        
    },
    methods: {
        getIp(){

            returnCitySN.cname = returnCitySN.cname.replace('省','').replace('市','')

            this.weath()
        },
        weath(){
            let mo = JSON.parse(localStorage.getItem('mo')) || {}
            if(!!mo.weather){
                this.weather = mo.weather
                return
            }
            
            getData(`/bd-weather/city=${returnCitySN.cname}`).then(res=>{
                this.weather={
                    city:res.data.weather.content.city,
                    img:res.data.weather.content.today.img[0],
                    condition:res.data.weather.content.today.condition,
                    wind:res.data.weather.content.today.wind,
                    temp:res.data.weather.content.currenttemp,
                    source:res.data.weather.content.source,
                    tomorrow:res.data.weather.content.tomorrow,
                }
                mo.weather = this.weather
                localStorage.setItem('mo',JSON.stringify(mo))
            })
        }
    },
}
</script>

<style>

</style>
