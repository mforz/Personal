<template>
    <div class="sidebar">
        <div class="con">
           <p v-for="(item,i) in data" :key="i">
               <a @click="$emit(item.url)">{{item.name}}</a>
           </p>
        </div>
    </div>
</template>

<script>
export default {
    name:'Sidebar',
    props:{
        data:{type:Array,required:true}
    }
}
</script>

<style>
.sidebar{
    width:80%;
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    border:1px solid #ccc;
    min-height:80px;
    text-align:center; 
}
</style>
