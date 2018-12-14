<template>
    <Modal :show="show" @close="$emit('close')">

      <div v-if="model==1" v-for="(item,i) in data" :key="i">
        <p style="text-align:center;cursor:pointer">
          <a target="_black" @click="$emit('sEmit','zframe',item.keyword)">{{item.keyword}}</a>
          <i :title="doc.length>0?doc[i].content.data[0].description:''" class="fa fa-free-code-camp" aria-hidden="true"></i>
        </p>
      </div>

      <div v-if="model==2" >
        <p style="text-align:center">
          <input id="trans-input" class="input" type="search" placeholder="需要翻译单词/汉语"  @keyup.enter="$emit('sEmit','trans')">
        </p>
        <div >
          <p v-for="(item,i) in data" :key="i" style="text-align:center">
            <a v-show="item[0].src">{{item[0].src}}:{{item[0].tgt}} </a>
          </p>
        </div>
      </div>

      <div v-if="!!data.basic&&model==3" >
        <p style="text-align:center">{{data.basic.cnty+"-"+data.basic.location}}</p>
        <div style="padding-left:20px">
          <p>现在天气:{{data.now.cond_txt}}，温度:{{data.now.tmp}} ℃</p>
          <p>风向:{{data.now.wind_dir}}，风力:{{data.now.wind_sc}}，风速:{{data.now.wind_spd}} km/h</p>
        </div>
      </div>

      <div v-if="model==4" >
        <p style="text-align:center">每日一句</p>
        <div style="padding-left:10px">
          <p>e:<a href="javascript:;" @click="oneAudio(data.tts)">{{data.content}}</a></p>
          <p>c:{{data.note}}</p>
        </div>
      </div>




      <Loading :show="data.length==0 && model!==2 " />

    </Modal>
</template>

<script>
import Modal from '@/components/Modal'
import Loading from '@/components/Loading'
export default {
    name:'sDialog',
    components:{
        Modal,Loading
    },
    props:{
        show:{type:Boolean,required:true},
        data:{type:[Array,Object,String],required:true,default:[]},
        model:{type:Number,required:true,},
        doc:{type:[Array,Object,String,Number,Boolean],required:false,},
    },
    data(){
        return{
          audio:null
        }
    },
    methods:{

      oneAudio(url){
        this.audio==null?this.audio=new Audio():''
        this.audio.src=url
        this.audio.paused?this.audio.play():this.audio.pause()
        
      }
    }
}
</script>

<style>

</style>
