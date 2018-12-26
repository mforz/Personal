<template>
    <div class="main">

        <div class="bar">
              <Sidebar :data="list" @isChange="is=true"/>
        </div>
        
        <div :class="is?'con':''">
            <Pack :show="is" @close="is=false; $router.back(-1)">
              <router-view />
            </Pack>
        </div>

    </div>
</template>

<script>
import Sidebar from '@/pages/Sidebar/'
import Pack from '@/components/Pack/'
export default {
    components:{
        Sidebar,
        Pack,
    },
    data(){
        return {
            is:false,
            list:[
                {name:'翻译',url:'/translate'},
                {name:'待办',url:'/todo'},
                {name:'一句',url:'/onewords'},
                // {name:'临时邮箱',url:'/email-temp'},
            ]
        }
    },
    methods: {
       
    },
}
</script>

<style scoped>
.main{
    width:100%;
    display:flex;
    height:90%;
}
.main .bar{
    max-width: 300px;
    margin:0 auto;
    flex:1;
    position: relative;
    overflow: hidden;
   
}
.main .con{
    flex:4;
}
.con{
    position: relative;
    height:100%;
}

</style>
