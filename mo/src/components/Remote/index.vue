<template>
<div>
  <remoteJS :src="src" @load="$emit('load')" />
</div>
</template>

<script>
export default {
  components: {
    'remoteJS': {
      render(createElement) {
        return createElement('script',{ attrs:{type:'text/javascript',src:this.src },on:{load:()=>{this.$emit('load')}} });
      },
      props:{src:{type: String, required: true },},
    },
  },
  props:{
    src: { type: String, required: true },
  },
  methods: {
  },

}
</script>

<style>

</style>
