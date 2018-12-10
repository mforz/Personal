<template>
    <div v-if="show" class="iframe" style="width:100%;" >
        <div style="margin:0 auto">
            <i class="fa fa-arrow-left" aria-hidden="true" @click="back"></i>
            <i class="fa fa-times" aria-hidden="true" @click="$emit('close')"></i>
            <iframe :id="id" width="100%" :style="style" :height="!!height?height:'500'" :onload="$emit('onload')" :src="src" frameborder="0" >
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
        style:{type:Object,required:false},
    },
    methods:{
        back(){
            let a= document.getElementById(this.id).contentWindow;
            a.parent.history.back()
        },
    }
}
</script>

<style>
.iframe i{
    color:red;
    margin:0;
}

</style>
