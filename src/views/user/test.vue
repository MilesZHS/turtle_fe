<template>
  <div id="test">
    {{c_id}}
  </div>
</template>
<script>
export default {
  name: "Test",
  data() {
    return {
      c_id: ''
    };
  },
  methods: {
    
  },
  created () {
    this.c_id = this.$route.params.c_id
  }
};
</script>
<style scoped>

</style>