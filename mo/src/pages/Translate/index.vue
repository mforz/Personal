<template>
    <div class="trans">
        <p style="text-align:center">
          lu译
        </p>

        <p style="text-align:center">
          <input v-model="value" class="input" type="search" placeholder="需要翻译单词/汉语" @keyup.enter="trans">
           <i class="i">*点击翻译可语音朗读</i>
        </p>
       

        <div class="con">
          <p v-for="(item,i) in data" :key="i" style="text-align:center">
            <a v-show="item.src" @click="tt(item.tgt)"> {{item.src}}:{{item.tgt}} </a>
          </p>
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
            value:'',
            data:[],
        }
    },
    methods: {
        trans(){

            Fetch('/youdao/&i='+this.value).then(res=>{

            this.data = !!res.translateResult? res.translateResult[0]: []
       
            }).catch(error=>console.log(error))
        },
        tt(tgt){
           tts(tgt)
        }
    },
}
</script>

<style scoped>
.trans{
    width:100%;
    font-size: 14px;
}

input{
    outline: none;
    width:25%;
    height:25px;
    border-radius: 8px;
    border:1px solid #d5d2d5;
}
.con{
    font-size: 16px;
    color:rgba(0,0,0,.7)
}
</style>
