<template>
    <div class="view">
        <Upload ID="upload" @change="change" />
        <iframe :src="src" width="100%" frameborder="0"></iframe>
    </div>
</template>

<script>
import Upload from '@/components/Upload'
export default {
    name:'iView',
    components:{
        Upload,
    },
    data(){
        return{
            src:null
        }
    },
    props:{

    },
    methods:{
        change(id){
           let dom = document.getElementById(id)
           let file = dom.files[0];
           let blobUrl = window.URL.createObjectURL(file)
          this.src=blobUrl
        }

    }
}
</script>

<style>

</style>
