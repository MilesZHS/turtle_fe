<template>
  <div id="club_browse_bg">
    <!--背景图层面板-->
    <div class="top_nav">
      <!--顶部导航栏-->
      <div class="home-logo">
        <a target="_blank" href>
          <img class="homepage-logo" src="/img/logo.png" width="40px" height="30px" />
        </a>
        <a target="_blank" href>甲鱼社团首页</a>
      </div>
      <div class="quick-nav">
        <a class="navItem" href>个人中心</a>
        <a class="navItem" href>个人中心</a>
        <a class="navItem" href>个人中心</a>
        <a class="navItem" href>个人中心</a>
      </div>
    </div>
    <div id="club_main">
      <!--主体部分-->
      <!-- swiper -->
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item,index) in photoList.slice(0,6)" :key="index">
          <img :src="item" class="swiper-img" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
      <div id="club_list">
        <!--社团列表-->
        <div class="card-browse" v-for="(item,index) in clubInfo.slice(0,6)" :key="index">
          <div class="img-wrapper-browse">
            <img :src="item.logo_path" alt class="image club-image" />
          </div>
          <div class="text-wrapper-browse">
            <div class="club-title">{{item.club_name}}</div>
            <div class="club-school">{{item.school}}</div>
            <div class="club-type">{{item.type}}</div>
            <div class="club-num">人数:{{item.number}}</div>
            <div class="club-level">等级:{{item.level}}</div>
            <div class="club-btn-browse">
              <el-button
                size="mini"
                type="primary"
                class="card-btn"
                @click="showInfo(item.club_id)"
              >详细信息</el-button>
              <el-button
                size="mini"
                type="primary"
                class="card-btn"
                @click="sendReq(item.club_id)"
              >立即报名</el-button>
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
        let getClubList = axios.create()
        getClubList.get(this.$global.PHP_HOST + '/person/getclublist',{
        params: {
          data: ""
        },
        headers: {
          token: token
        }
// <<<<<<< HEAD
//       })
//       .then(res => {
//         console.log(res);
//         this.photoList = res["data"]["data"]["banner"];
//         // this.clubInfo = res['data']['data']['info']
//         this.clubInfo = Object.entries(res["data"]["data"]["info"]);
//         for (let index = 0; index < this.clubInfo.length; index++) {
//           this.clubInfo[index] = this.clubInfo[index][1];
// =======
        }).then(res=>{
        this.banners = res['data']['data']['banner']
        this.clubInfo = Object.entries(res['data']['data']['info'])	
                for (let index = 0; index < this.clubInfo.length; index++) {
                    this.clubInfo[index] = this.clubInfo[index][1];
        }
      })
      .catch(err => {
        console.log(err.response);
      });
  },
  data() {
    return {
      url: "login",
      photoList: [
        "http://qdu17zs.com/15dcabaf4096011573901207623",
        "http://qdu17zs.com/15dcabaf4096011573901207623",
        "http://qdu17zs.com/15dcabaf4096011573901207623"
      ],
      swiperOption: {
        spaceBetween: 45,
        centeredSlides: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      clubInfo: [
        {
          club_id: "",
          club_name: "青岛大学无人机创新协会",
          number: "30",
          level: "5",
          school: "青岛大学",
          type: "学艺类，科技",
          logo_path:
            "http://q0mybgzn5.bkt.clouddn.com/15dcabaf4096011573901207623"
        }
      ]
    };
  },
  methods: {
    chooseType(index) {
      console.log(index);
    },
    toLogin() {
      this.$router.push("login");
    },
    Logout() {
      let person = localStorage.getItem("person");
      person = JSON.parse(person);
      let logout = axios.create();
      logout
        .post(
          this.$global.PHP_HOST + "/person/logout",
          {
            phone: person["phone"]
          },
          {
            headers: {
              token: person["token"]
            }
          }
        )
        .then(res => {
          if (res["data"]["message"] == "退出成功") {
            this.isLogin = false;
          }
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    showInfo(id) {
      console.log(id);
      this.$router.push({
        name: "Club_info",
        params: {
          c_id: id
        }
      });
    },
    sendReq(id) {
      console.log(id);
    }
  }
};
</script>

<style scoped>
    .theTitle{
        margin:50px 0;
        width: 100%;
        background-color:white; 
        text-align: center;
        vertical-align: middle;
        font-size: 45px;
        line-height: 80px;
    }
    .theInfo{
        margin:30px 50px 30px 50px;
        height: 100px;
        background-color:white; 
        border-radius: 3%;
        box-shadow: 5px 5px 10px #999;
        text-indent: 50px;
    }
    .navItem{
        padding: 0 10px;
        margin: 10px 0;
    }
    #club_browse_bg{
        width: 100%;
        background-color: #eee;
        overflow: hidden;
        
    }
    #club_main{
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
        margin-top: 10px;
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
    .club-btn-browse{
        margin-top: 10px;
        width: 340px;
        top: 120px;
        left: 720px;
        position: absolute;
    }
</style>