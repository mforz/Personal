<template>
    <div class="todo">
        <p style="text-align:center">待办</p>
        <div class="con">
          <p >
            <input
              class="input"
              type="text"
              v-model="to"
              @keypress.enter="todo('add')"
            >
             <i class="i">*点击待办可语音朗读</i>
          </p>
       
          <div class="do">
            <p class="list" v-for="(item,i) in list" :key="i">
              <a @click="tt(item.con)" :style="item.status?'':{textDecoration:'line-through',color:'#aaa'}">{{item.con}}</a>
              <i class="fa fa-trash pull-right" @click="todo('del',i)"></i>
              <i v-show="item.status" class="fa fa-square-o pull-right" @click="list[i].status=!list[i].status"></i>
              <i v-show="!item.status" class="fa fa-check-square-o pull-right"  @click="list[i].status=!list[i].status"></i>
            </p>

            <p style="color:#b6b6b6;font-size:13px" v-show="list.length==0">
               暂时没有需要做的事情，输入待办，按回车键添加
            </p>

          </div>

        </div>
    </div>
</template>

<script>
import {tts,storeSet,storeGet} from '@/static/Js/index.js'
export default {
    name:'Todo',
    data(){
        return{
            list:[],
            to:'',
        }
    },
    mounted() {
        this.list= storeGet('todolist')||[]
    },
    methods: {
      todo(f,i){
        (f=='del')?this.list.splice(i,1):
        !!this.to?
        (this.list.push({status:true,con:this.to,}),this.to=''):''
    
        storeSet('todolist',this.list)

      },
      tt(tgt){
          !!tgt?tts(tgt):''
      }
    },

}
</script>

<style scoped>

.todo{
    width:100%;
    overflow: hidden;
}
.do{
    width:80%;
    margin:0 auto;
    padding:0 12px;
}
.con{
    width:100%;
    text-align: center;
}

.list{
    width:100%;
    padding:8px 0;
    font-size:13px;
    text-align: left;
    border-bottom:1px dashed #eee;
   
}

</style>
