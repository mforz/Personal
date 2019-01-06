<template>
    <div>
        <meta name="referrer" content="no-referrer" />
       <p>壁纸</p>
       <div class="paper" style="width:100%;height:100%">
            <img v-for="(item,i) in list" :key="i" :src="item.src.originalSrc"  :width="random()" height="200" style="margin:0;padding:0" />
       </div>

       <div class="paper" style="width:100%;height:100%">
           <Loading :show="!list.length"/>
       </div>
    </div>
</template>

<script>
import Loading from '@/components/Loading'
import Fetch from '@/static/Fetch/'
let rand=[]
export default {
    name:'Wallpaper',
    components:{
        Loading
    },
    data(){
        return{
            list:[],
            height:0,
            i:0,
        }
    },
    mounted() {
       this.init()
       console.log(window.scroll)
       window.scroll= function(){
           console.log('ssss')
            if (($(document).scrollTop()) >= ($(document).height() - $(window).height())) {
                console.log('ssss')
            }
        }
    },
    methods: {
        init(){
             Fetch('/inf-wallpaper?page='+this.i).then(res=>{
                this.list=res.data
                this.i=this.i+1
                this.height= Math.ceil((this.i*50)/4)*200
                console.log(this.height)
            }).catch()
        },
        random(i){
            if(rand.length==0){
                let a = Math.floor(Math.random()*(30-20+1)+20),b= Math.floor(Math.random()*(30-20+1)+20), c = 50-a, d = 50-b;
                rand=[a,b,c,d]
                if(rand.some(r=> 1/r===Infinity)){
                    rand=[]
                    this.random()
                }
            }
            let res = rand.pop()
            !!String(i)?res=res+'%':res
            return res
        }
    },
    
   

}
</script>

<style>

</style>
