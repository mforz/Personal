<template>
    <div class="modal" :class=" !!show ? '':'hidden' " v-show="show">
        <i class="fa fa-times fa-2x" aria-hidden="true" @click="$emit('close')"></i>
       
        <div style="height:100%;overflow:auto">
                <slot >
                {{msg}}
            </slot>
        </div>
    </div>
</template>

<script>
export default {
    name:'modal',
    props:{
        show:{type:Boolean,required:true},
        msg:{type:String,required:false},
    },
    methods:{
        
    }
}
</script>

<style>
.modal{
    position:absolute;
    top:0;left:0;
    right:0;bottom:0;
    /* background-color:rgba(0,0,0,.5) */
}
.fa{
    cursor: pointer;
}
.fa-times{
    color:red;
    float:right;
    margin:20px;
}
.dialog{
    /* width:300px;
    height:350px; */
    position: absolute;
    overflow: hidden;
    top:47%;
    left:50%;
    transform: translate(-50%,-50%) scale(1);
    opacity: 1;
    background-color:#fff;
    -webkit-transition: all .5s ease-in;
    -moz-transition: all .5s ease-in;
    transition: all .5s ease-in;
}
.hidden{
    transform: scale(0);
    opacity: 0;
}

</style>
