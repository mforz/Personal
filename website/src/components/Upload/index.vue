<template>
    <div>
        <input :id="ID" type="file" @change="$emit('change',ID)" >
    </div>
</template>

<script>
export default {
    name:'upload',
    props:{
        ID:{type:String||Number , required:true},
    }
}
</script>

<style>

</style>
