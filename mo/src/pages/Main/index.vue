<template>
    <div class="main">
        <div class="bar" @click="is=!is;$router.push('/translate')">
              <Sidebar :data="list" @changeRouter="changeRouter" />
        </div>
        
        <div v-show="is" :class="is?'con':''">
            <Modal :show="is" @close="is=!is">
              <router-view />
            </Modal>
        </div>

    </div>
</template>

<script>
import Sidebar from '@/pages/Sidebar/'
import Modal from '@/components/Modal/'
export default {
    components:{
        Sidebar,
        Modal,
    },
    data(){
        return {
            is:false,
            list:[
                {name:'翻译',url:'/translate'}
            ]
        }
    },
    methods: {
        changeRouter(v){
            this.$router.replace(v)
        }
    },
}
</script>

<style scoped>
.main{
    width:100%;
    display:flex;
    height:100px;
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
    height:400px;
}

</style>
