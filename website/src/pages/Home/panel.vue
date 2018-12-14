<template>
     <div class="content" :style="visible?{visibility:'visible'}:{visibility:'hidden'}">
      <p style="font-size:1.4rem">站点功能</p>
      <div style="overflow:hidden">
        <span class="item" @click="$emit('handleClick','热词')">热词</span>
        <span class="item" @click="$emit('handleClick','一句')">一句</span>
        <span class="item" @click="$emit('handleClick','天气')">天气</span>
        <span class="item" @click="$emit('handleClick','翻译')">翻译</span>
        <span class="item" @click="$emit('handleClick','小说')">小说</span>
      </div>
    </div>
</template>

<script>
export default {
    name:'Panel',
    props:{
        visible:{type:Boolean,required:true}
    }

}
</script>

<style>

</style>
