<template>
    <div>
        <h2 style="text-align:center">热点</h2>
        <div class="group">
            <div class="item" v-for="(item,i) in data" :key="i">
                <span  v-if="item.id=='bd'">
                    <h4>百度</h4>
                    <span v-for="(res,j) in item.con" :key="j">
                        <a target="_black" :href="item.url+res.keyword" class="title">{{res.keyword}}</a>
                    </span>
                </span>
                <span  v-if="item.id=='sg'">
                    <h4>搜狗</h4>
                    <span v-for="(res,j) in item.con" :key="j">
                       <a target="_black" :href="item.url+res.title" class="title">{{res.title}}</a>
                    </span>
                </span>
                <span v-if="item.id=='sina'">
                    <h4>新浪</h4>
                    <span v-for="(res,j) in item.con" :key="j">
                       <a target="_black" :href="item.url+res.title" class="title">{{res.title}}</a>
                    </span>
                </span>
            </div>
            <!-- <Loading :show="!(data.length)"/> -->
        </div>
    </div>
</template>

<script>
import Fetch from '@/static/Fetch/'
import Loading from '@/components/Loading'
import {isPhone} from '@/static/Js/index.js'
export default {
    name:'HotWords',
    components:{
        Loading
    },
    data(){
        return{
            i:0,
            list:['/bd-hotword','/sg-hotword','/sina-hotword'],
            data:[],
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init(){
            let url =this.list[this.i]
            Fetch(url).then(res=>{
                console.log(isPhone)
                try{
                    switch(this.i){
                        case 0:
                            this.data.push({
                                id:'bd',
                                con:res.result.topwords.splice(0,10)||[],
                                url:isPhone?'https://m.baidu.com/s?ie=UTF-8&wd=':'https://www.baidu.com/s?wd=',
                            })
                            this.i = this.i+1
                            this.init()
                        break
                        case 1:
                            this.data.push({
                                id:'sg',
                                con:res||[],
                                url:isPhone?'https://wap.sogou.com/web/searchList.jsp?keyword=':'https://www.sogou.com/web?query='
                            })
                            this.i = this.i+1
                            this.init()
                        break
                        case 2:
                            this.data.push({
                                id:'sina',
                                con:res.result.data||[],
                                url:isPhone?'https://m.weibo.cn/search?containerid=100103type=1&q=':'https://s.weibo.com/weibo/'
                            })
                            this.i = 'ok'
                        break
                    }
                }catch(e){
                    console.log(this.$router.history.current.path,e)
                    this.data=[]
                }
            
            }).catch(err=>console.log(err))
        }
    },
}
</script>

<style>
.group{
    display:flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
.group .item{
    flex:1;
    text-align: center;
}
.item p{
    width:20%;
    background-color:#f5f6f3;
    margin:5px auto;
}

.title{
    display:block;
    font-size: 13px;
    text-decoration: none;
    color:#303030;
    opacity: .7;
}
.title:hover{
      text-decoration: underline;
      opacity: .9;
}
</style>
