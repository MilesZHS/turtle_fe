<template>
  <div class="container">
    <div class="header">
      <img :src="logoURL" id="logo">
      <img :src="textURL" id="text">
      <div class="search_wrapper">
        <img :src="searchURL" alt="" id="icon_search">
        <form action="" method="get">
          <input type="text">
        </form>
      </div>
      <div class="list_top_wrapper">
        <ul id="list_top">
          <li><a>首页</a></li>
          <li @click="toLogin"><a>社团管理</a></li>
          <li><a>活动发布</a></li>
          <li><a>后台管理</a></li>
          <li><a>联系我们</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      logoURL: require('../assets/img/logo.png'),
      textURL: require('../assets/img/text.png'),
      searchURL: require('../assets/img/search.png')
    }
  },
  props: ['login'],
  methods: {
    search () {
      console.log('searching')
    },
    toLogin(){
      this.$router.push('/login')
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="css">
html,body{overflow:hidden;}
.container{
margin: 0px;
padding: 0%;
width: 100%;
height: 60px;
}
.header{
  width: 100%;
  height: 60px;
  position: relative;
  display: flex;
  align-items: center;
}
#logo{
  width:4%;
  position: absolute;
  left: 60px;
}
#text{
  width: 8%;
  position: absolute;
  left: 9%;
}
.search_wrapper{
  position: relative;
  left: 38%;
  width: 20%;
  height: 28px;
  border-radius: 30px;
  border: 1px solid #848484;
  display: flex;
  align-items: center;
}
.search_wrapper form{
  width: 100%;
}
.search_wrapper form input{
  width: 90%;
  height: 28px;
  border: none;
  margin-left: 4px;
}
#icon_search{
  width: 20px;
  height: 20px;
  margin-left: 5%;
}
.list_top_wrapper{
  width: 30%;
  position: absolute;
  right: 8%;
}
#list_top{
  width: 100%;
}
#list_top li{
  width: 20%;
  list-style: none;
  float: left;
  text-align: center;
  font-size: 16px;
}
#list_top li:hover{
  color: #37baa0;
  cursor: pointer;
}
.avatar_wrapper{
  width: 36px;
  height: 36px;
  position: absolute;
  right: 4%;
  border-radius: 60px;
}
#avatar{
  width: 100%;
  height: 36px;
  border-radius: 60px;
}
#avatar img{
  width:100%;
  height: 36px;
  overflow: hidden;
  border: none;
}
</style>
