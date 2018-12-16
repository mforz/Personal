<template>
    <Modal :show="show" @close="$emit('close'),audio=null" >
      <p>
        <span>百度</span>
        <span>搜狗</span>
      </p>
      <div v-if="model==1" v-for="(item,i) in data" :key="i">
        <p style="text-align:center;cursor:pointer;overflow:auto;">
          <a target="_black" @click="$emit('sEmit','zframe',item.keyword)">{{item.keyword}}</a>
          <i :title="i<9?doc[i].content.data[0].description:''" class="fa fa-free-code-camp" aria-hidden="true"></i>
        </p>
      </div>

      <div v-if="model==2" >
        <p style="text-align:center">
          <input id="trans-input" class="input" type="search" placeholder="需要翻译单词/汉语" @keyup.enter="$emit('sEmit','trans')">
        </p>
        <div >
          <p v-for="(item,i) in data" :key="i" style="text-align:center">
            <a v-show="item[0].src"> {{item[0].src}}:{{item[0].tgt}} </a>
          </p>
        </div>
      </div>

      <div v-if="!!data.basic && model == 3" >
        <p style="text-align:center">{{ data.basic.cnty +"-"+ data.basic.location }}</p>
        <div style="padding-left:20px">
          <p>现在天气:{{data.now.cond_txt}}，温度:{{data.now.tmp}} ℃</p>
          <p>风向:{{data.now.wind_dir}}，风力:{{data.now.wind_sc}}，风速:{{ data.now.wind_spd }} km/h</p>
        </div>
      </div>

      <div v-if="model==4" >
        <p style="text-align:center">每日一句</p>
        <div style="padding-left:10px">
          <p>e:<a href="javascript:;" @click="$emit('sEmit','oneAudio',data.tts)">{{data.content}}</a></p>
          <p>c:{{data.note}}</p>
        </div>
      </div>

      <div v-if="model==5" style="height:100%;overflow:hidden">
        <p style="text-align:center">待办</p>
        <div style="padding-left:5px;height:90%;">
          <p style="overflow:hidden">
            <input class="input-m5"
              type="text"
              v-model="i5"
              @keypress.enter="i5?list.push({id:list.length,con:i5,status:true}):'',i5=''">
          </p>
          <div style="width:100%;height:85%;overflow-y:auto;">
            <p style="font-size:13px;width:100%;border-bottom:1px dashed #eee;padding:8px 0;" v-for="(item,i) in list" :key="i">
              <a :style="item.status?'':{textDecoration:'line-through',color:'#aaa'}">{{item.con}}</a>
              <i class="fa fa-trash pull-right" @click="list.splice(i,1)"></i>
              <i v-show="item.status" class="fa fa-square-o pull-right" @click="list[i].status=!list[i].status"></i>
              <i v-show="!item.status" class="fa fa-check-square-o pull-right"  @click="list[i].status=!list[i].status"></i>
            </p>
            <p style="color:#b6b6b6;font-size:13px" v-show="list.length==0">
               暂时没有需要做的事情，输入待办，按回车键添加
            </p>
          </div>
          
        </div>
      </div>

    <Loading :show="data.length==0 && model!==2 && model!==5" />
    </Modal>
</template>

<script>
import Modal from '@/components/Modal'
import Loading from '@/components/Loading'
export default {
    name:'sDialog',
    components:{Modal,Loading},
    props:{
        show:{type:Boolean,required:true},
        data:{type:[Array,Object,String],required:true,default:[]},
        model:{type:Number,required:true,},
        doc:{type:[Array,Object,String,Number,Boolean],required:false,},
    },
    data(){
        return{
          i5:null,
          audio:null,
          list:[],
        }
    },
    watch:{
      list:(v)=>{
        localStorage.setItem('list',JSON.stringify(v))
      }
    },
    mounted() {
      this.list=JSON.parse(localStorage.getItem('list'))
    },
    methods:{
      
    },
    destroyed() {
      this.audio = null
    },
}
</script>

<style>
.input-m5{
  display:block;
  width:60%;
  height:25px;
  margin:0 auto;
  outline: none;
  border:1px solid #d5d2d5;
  border-radius: 8px;
}
i{
  margin:0 4px;
}
</style>
