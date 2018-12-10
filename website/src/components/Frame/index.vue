<template>
    <div v-if="show" class="iframe" :style="bstyle" >
        <div style="position:relative;overflow:hidden">
            <div >
                <i class="fa fa-arrow-left" aria-hidden="true" @click="back"></i>
                <i class="fa fa-times" aria-hidden="true" @click="$emit('close')"></i>
            </div>
           
            <iframe :name="id" width="100%" 
                :height="!!height?height:'500'"
                style="overflow:hidden;"
                @onload="$emit('onload')" 
                :src="src" frameborder="0" 
                scrolling="auto">
                不支持嵌入网页，请更换或升级浏览器
            </iframe>
        </div>
    </div>
</template>

<script>
export default {
    name:'Frame',
    props:{
        id:{type:String,required:true},
        show:{type:Boolean,required:true},
        height:{type:Number,required:false},
        src:{type:String,required:true},
        bstyle:{type:Object,required:false},
    },
    methods:{
        back(){
            let a= window.frames[this.id];
            a.parent.history.go(-1)
        },
    }
}
</script>

<style>
.iframe i{
    color:red;
    margin:0;padding:0;
}

</style>
