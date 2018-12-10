<template>
    <div class="fun">
        <div class="windmill" @click="$emit('transBg')">
            <img :src="img" alt="小风车换壁纸" >
        </div>
    </div>
</template>

<script>
import './index.css'

export default {
    name:'Header',
    data(){
        return{
            img: require('@/assets/img/windmill.png'),
        }
    }
}
</script>

<style>

</style>
