<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  provide(){
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload(){
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
*{
  padding: 0%;
  margin: 0%;
}
html,body{overflow:hidden;overflow-y:auto;}
a:hover{
  cursor: pointer;
  color: #37baa0;
}
</style>
