<template>
    <div>
        <p style="text-align:center">热点</p>
        <div>
            <div v-for="(item,i) in data" :key="i">
                <p v-if="{item.id=='bd'}"> {{item}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import Fetch from '@/static/Fetch/'
export default {
    name:'HotWords',
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
                console.log(res)
                try{
                    switch(this.i){
                        case 0:
                            this.data.push({
                                id:'bd',
                                con:res.result.topwords.splice(0,10)||[]
                            })
                            this.i = this.i+1
                            this.init()
                        break
                        case 1:
                            this.data.push({
                                id:'sg',
                                con:res||[]
                            })
                            this.i = this.i+1
                            this.init()
                        break
                        case 2:
                            this.data.push({
                                id:'sina',
                                con:res.result.data||[]
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

</style>
