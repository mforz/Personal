<template>
    <div class="onewords">
        <div class="con">
            <p style="text-align:center">每日一句</p>

            <div class="ec">
                <p>e:<a href="javascript:;" @click="tt(data.tts)">{{data.content}}</a></p>
                <p>c:{{data.note}}</p>
            </div>

            <p style="overflow:hidden">
               <i class="f-r i" @click="show=!show" > 图片 </i>
            </p>

            <div v-show="show" class="w-50 txt-center auto">
                 <img :src="data.fenxiang_img" style="width:150px" />
            </div>
            
        </div>
    </div>
</template>

<script>
import Fetch from '@/static/Fetch/'
import {tts} from '@/static/Js/index.js'
export default {
    name:'Translate',
    data(){
        return{
            data:{},
            show:false,
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init(){
            Fetch('/iciba-one').then(res=>{
            this.data=res
            }).catch(error=>console.log(error))
        },
        tt(tgt){
           tts(null,tgt)
        }
    },
}
</script>

<style scoped>
.onewords{
    width:100%;
}
.con{
    width:80%;
    padding:20px;
    margin:0 auto;
}
.ec{
    margin:30px 0 0 30px;
}
.onewords .i{
    font-size: 12px;
    transform: scale(1);
    color:#ccc;
    cursor: pointer;
}
.onewords i:hover{
    text-decoration: underline;
}
</style>
