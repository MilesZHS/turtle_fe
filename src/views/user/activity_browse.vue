<template>
    <div id="activity_browse_bg">    <!--背景图层面板-->
        <div class="top_nav">  <!--顶部导航栏-->
            <div class="home-logo">
                <a target="_blank" href="">
                    <img class="homepage-logo" src="/img/logo.png" width="40px" height="30px">
                </a>
                <a target="_blank" href="">
                    甲鱼社团首页
                </a>
            </div>
            <div class="quick-nav">
                <a class="navItem" href="">个人中心</a>
                <a class="navItem" href="">个人中心</a>
                <a class="navItem" href="">个人中心</a>
                <a class="navItem" href="">个人中心</a>
            </div>
       </div>
        <div id="activity_main">  <!--主体部分-->
                <!-- swiper -->
                <swiper :options="swiperOption"><!--轮播图-->
                    <swiper-slide v-for="(item,index) in photoList.slice(0,5)" :key="index">
                    <img :src="item" class="swiper-img">
                </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                    <div class="swiper-button-prev" slot="button-prev"></div>
                    <div class="swiper-button-next" slot="button-next"></div>
                </swiper>
                <div id="activity_list">    <!--社团列表-->
                   <div class="card-browse" v-for="(item,index) in actInfo.slice(0,6)" :key="index">
                       <div class="img-wrapper-browse">
                           <img :src="item.logo_path" alt="" class="image act-image">
                       </div>
                       <div class="text-wrapper-browse">
                           <div class="act-name">
                           {{item.name}}
                        </div>
                        <div class="act-area">
                        地点：{{item.area}}
                        </div>
                        <div class="act-time">
                        时间：{{item.time}}
                        </div>
                        <div class="act-num">
                        人数:{{item.num}}
                        </div>
                        <div class="act-price">
                        价格:{{item.price}}
                        </div>
                        <div class="act-btn-browse">
                            <el-button size="mini" type="primary" class="card-btn" @click="showInfo(item.id)">详细信息</el-button>
                            <el-button size="mini" type="primary" class="card-btn" @click="sendReq(item.id)">立即报名</el-button>
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default{
    created(){
        //获取用户信息
        let user = JSON.parse(localStorage.getItem('person'))
        let token = user['token']
        //初始化axios
        let getActList = axios.create()
        getActList.get(this.$global.PHP_HOST + '/person/getactlist',{   
        params: {
            'data': ''
        },
        headers: {
            'token': token
        }
        }).then(res=>{
        // this.banners = res['data']['data']['banner']
        // this.actInfo = res['data']['data']['info']
        console.log(res)
        this.actInfo = Object.entries(res['data']['data'])  
          for (let index = 0; index < this.actInfo.length; index++) {
              this.actInfo[index] = this.actInfo[index][1];
              this.actInfo[index].logo_path = this.actInfo[index]['photo_path'][0]
              this.photoList[index] = this.actInfo[index]['photo_path'][0]
        }
        }).catch(err=>{
        console.log(err)
        })
    },
    data() {
      return {
        photoList: [
            'http://q0mybgzn5.bkt.clouddn.com/15dcabaf4096011573901207623',
            'http://q0mybgzn5.bkt.clouddn.com/15dcabaf4096011573901210126',
            'http://q0mybgzn5.bkt.clouddn.com/15dcabaf4096011574233839050',
            'http://q0mybgzn5.bkt.clouddn.com/15dcabaf4096011573901207623',
            'http://q0mybgzn5.bkt.clouddn.com/15dcabaf4096011573901210126',
            'http://q0mybgzn5.bkt.clouddn.com/15dcabaf4096011574233839050'
        ],
        swiperOption: {
          spaceBetween: 45,
          centeredSlides: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        actInfo: [{
        id: '',
        name: '飞手第一次培训',
        area:'无人机协会内',
        time:'2019-12-04 09：12',
        num: '10',
        price:'0',
        logo_path: 'http://q0mybgzn5.bkt.clouddn.com/15dcabaf4096011573901207623'
      }],
      }
    },
    methods: {
    chooseType(index){
      console.log(index)
    },
    mouseOut(){
      this.actType = ''
    },
    toLogin(){
      this.$router.push('login')
    },
    showInfo(id){
      console.log(id)
      this.$router.push({
        name: "Activity_info", 
        params: {
          act_id: id
        } 
      })
    },
    sendReq(id){
      console.log(id)
    }
  }
}
</script>


<style>
    .navItem{
        padding: 0 10px;
        margin: 10px 0;
    }
    #activity_browse_bg{
        width: 100%;
        background-color: #eee;
        overflow: hidden;
        
    }
    #activity_main{
        margin: auto;
        margin-top: 30px;
        margin-bottom: 30px;
        padding: 30px;
        background-color:white;
        width: 75%;
        line-height: 30px;
        vertical-align: middle;
        border-radius: 3%;
        box-shadow: 0px 0px 10px #e8e8e8;

    }
    .swiper-slide{
        height: 100%;
    }
    .swiper-img{
        width: 100%;
        height: 360px;
        object-fit: cover;
    }
    .card-browse{
        width: 100%;
        height: 210px;
        margin: 5px;
        color: #434a50;
    }               
    .img-wrapper-browse{
        width: 25%;
        height: 100px;
        display: inline-block;
        width: 160px;
        
    }
    .img-wrapper-browse img{
      width: 100px;
      height: 100px;
      
    }
    .text-wrapper-browse{
        width: 75%;
        display: inline-block;
        height: 90px;
        position: relative;
        font-size: 12px;
    }
    .act-btn-browse{
      position: absolute;
      left: 630px;
    }
</style>
