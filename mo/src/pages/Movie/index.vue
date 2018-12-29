<template>
    <div class="movie">
        <h3 style="text-align:center">-电影-</h3>
        <p style="text-align:center">
            <a @click="release">热映</a>-<a>推荐</a>-<a @click="classic">经典</a>
        </p>
        <div class="release">
            <div v-for="(item ,i) in list" :key="i">
                <div class="list">
                    <img :src="item.images.medium" width="100" height="150" />
                    <p class="item">
                        <span>{{`${item.title} (${item.year})`}}</span>
                        <span>评分：<i>{{item.rating?item.rating.average:''}}</i> </span>
                        <span>类型：<i v-for="(res,j) in item.genres" :key="j">{{res}}</i></span>
                        <span>主演：<i v-for="(res,j) in item.casts" :key="j"> {{res.name}} ,</i></span>
                        <span>导演：<i v-for="(res,j) in item.directors" :key="j"> {{res.name}} ,</i></span>
                    </p>
                </div>
            </div>
        </div>

        <div>

        </div>

    </div>
</template>

<script>
import Fetch from '@/static/Fetch/'
let rand=[]
export default {
    name:'Wallpaper',
    data(){
        return{
            list:[],
            height:0,
            i:0,
        }
    },
    mounted() {
       this.release()
    },
    methods: {
        release(){
             Fetch('/db-movie-release?start='+this.i).then(res=>{
                this.list=res.subjects
            }).catch()
        },
        classic(){
            Fetch('/movie250?start='+this.i).then(res=>{
                this.list=res.subjects
            }).catch()
        }

      
    },
}
</script>

<style>
.movie{
    width:100%;
}
.movie .release{
    width:80%;
    margin:0 auto;
}
.release .list{
    display:flex;
    padding:0 20px;
    margin: 10px auto;
    align-items: center;
}
.list .item{
    font-size: 14px;
    padding-left:8px;

}
.item span{
    margin:0 5px;
}
.item i{
    font-size:12px;
}


</style>
