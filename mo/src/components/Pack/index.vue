<template>
    <div class="pack" :class=" !!show ? '':'hidden' " v-show="show">
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
    name:'Pack',
    props:{
        show:{type:Boolean,required:true},
        msg:{type:String,required:false},
    },
    methods:{
        
    }
}
</script>

<style>
.pack{
    position:absolute;
    top:0;left:0;
    right:0;bottom:0;
    /* background:#ccc; */
    /* rgba(0,0,0,.5); */
    overflow: hidden;
}
.fa{
    cursor: pointer;
}
.fa-times{
    color:red;
    float:right;
    margin:20px;
}

.hidden{
    transform: scale(0);
    opacity: 0;
}

</style>
