<template>
<div>
  <remoteJS :src="src" />
</div>
</template>

<script>
export default {
  components: {
    'remoteJS': {
      render(createElement) {
        return createElement('script', { attrs: { type: 'text/javascript', src: this.src }});
      },
      props: { src: { type: String, required: true },},
    },
  },
  props:{
    src: { type: String, required: true },
  },
  mounted() {
  },

}
</script>

<style>

</style>
