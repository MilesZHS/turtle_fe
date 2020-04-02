<template>
  <div class="home">
    <nav-top login="/login"></nav-top>
    <div class="content-wrapper">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content typelist">
            <div class="nav-left" @mouseleave="mouseOut">
              <ul class="nav-ul">
                <li>
                  <h4>社团类别</h4>
                </li>
                <li
                  v-for="(item,index) in list"
                  @mousemove="mouseIn(item)"
                  :key="index"
                  @click="chooseType(index)"
                >{{item}}</li>
              </ul>
              <div class="nav-list" v-show="clubType == '服务类社团'">
                <h3>服务类社团</h3>
                <ul>
                  <li
                    v-for="(item,index) in navClubList"
                    :key="index"
                    @click="navClub(item.club_id)"
                  >{{item.club_name}}</li>
                </ul>
              </div>
              <div class="nav-list" v-show="clubType == '康乐类社团'">
                <h3>康乐类社团</h3>
                <ul>
                  <li
                    v-for="(item,index) in navClubList"
                    :key="index"
                    @click="navClub(item.club_id)"
                  >{{item.club_name}}</li>
                </ul>
              </div>
              <div class="nav-list" v-show="clubType == '生命类社团'">
                <h3>生命类社团</h3>
                <ul>
                  <li
                    v-for="(item,index) in navClubList"
                    :key="index"
                    @click="navClub(item.club_id)"
                  >{{item.club_name}}</li>
                </ul>
              </div>
              <div class="nav-list" v-show="clubType == '体能类社团'">
                <h3>体能类社团</h3>
                <ul>
                  <li
                    v-for="(item,index) in navClubList"
                    :key="index"
                    @click="navClub(item.club_id)"
                  >{{item.club_name}}</li>
                </ul>
              </div>
              <div class="nav-list" v-show="clubType == '学艺类社团'">
                <h3>学艺类社团</h3>
                <ul>
                  <li
                    v-for="(item,index) in navClubList"
                    :key="index"
                    @click="navClub(item.club_id)"
                  >{{item.club_name}}</li>
                </ul>
              </div>
              <div class="nav-list" v-show="clubType == '思潮类社团'">
                <h3>思潮类社团</h3>
                <ul>
                  <li
                    v-for="(item,index) in navClubList"
                    :key="index"
                    @click="navClub(item.club_id)"
                  >{{item.club_name}}</li>
                </ul>
              </div>
              <div class="nav-list" v-show="clubType == '其他社团'">
                <h3>其他社团</h3>
                <ul>
                  <li
                    v-for="(item,index) in navClubList"
                    :key="index"
                    @click="navClub(item.club_id)"
                  >{{item.club_name}}</li>
                </ul>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <swiper :options="swiperOption" class="grid-content swiper-wrapper">
            <swiper-slide v-for="(banner,index) in banners.slice(0,6)" :key="index">
              <img :src="banner" alt srcset class="swiper-img" />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </el-col>
        <el-col :span="6">
          <div class="grid-content typelist">
            <div v-show="!isLogin" class="person-info-bg">
              <div class="avatar-wrapper">
                <router-link to="login">
                  <div id="avatar">
                    <img :src="avatarURL" alt />
                  </div>
                </router-link>
              </div>
              <div id="no-login-text">
                <h4>您还没有登录</h4>
                <el-button type="primary" id="login-btn" @click="toLogin">登录/注册</el-button>
              </div>
            </div>
            <div v-show="isLogin" class="person-info-bg">
              <div class="avatar-wrapper">
                <div id="avatar">
                  <router-link to="/User_info">
                    <img :src="avatarURL" alt="用户头像" />
                  </router-link>
                </div>
                <div id="person-info">
                  <ul>
                    <li v-for="(item,index) in userInfo" :key="index">{{item}}</li>
                    <li class="li-btn">
                      <el-button size="mini" type="primary" @click="toMyClub">我的社团</el-button>
                    </li>
                    <li class="li-btn">
                      <router-link to="/Club_browse">
                        <el-button size="mini" type="primary">查找社团</el-button>
                      </router-link>
                    </li>
                    <li class="li-btn">
                      <router-link to="/Activity_browse">
                        <el-button size="mini" type="primary">参加活动</el-button>
                      </router-link>
                    </li>
                    <li class="li-btn" @click="Logout">
                      <el-button size="mini" type="warning">退出登录</el-button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="recommend-container">
        <div class="recommend">
          <h2>推荐社团</h2>
          <div class="card-bg">
            <div class="card" v-for="(item,index) in clubInfo.slice(0,6)" :key="index">
              <!--这里是使用循环显示6张卡片-->
              <div class="img-wrapper">
                <img :src="item.logo_path" alt class="image club-image" />
              </div>
              <div class="text-wrapper">
                <div class="club-title">{{item.club_name}}</div>
                <div class="club-school">{{item.school}}</div>
                <div class="club-type">{{item.type}}</div>
                <div class="club-num">人数:{{item.number}}</div>
                <div class="club-level">等级:{{item.level}}</div>
                <div class="club-btn">
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
        <div class="recommend">
          <h2>推荐活动</h2>
          <div class="card-bg">
            <div class="card" v-for="(item,index) in actList.slice(0,6)" :key="index">
              <div class="img-wrapper">
                <img :src="item.photo_path" alt class="image act-image" />
              </div>
              <div class="text-wrapper">
                <div class="act-name">{{item.name}}</div>
                <div class="act-area">{{item.area}}</div>
                <div class="act-time">{{item.time}}</div>
                <div class="act-num">人数:{{item.num}}</div>
                <!-- <div class="act-club">
                  {{item.club}}
                </div>-->
                <div class="act-price">价格:{{item.price}}</div>
                <div class="act-btn">
                  <el-button
                    size="mini"
                    type="primary"
                    class="card-btn"
                    @click="showActInfo(item.id)"
                  >详细信息</el-button>
                  <el-button
                    size="mini"
                    type="primary"
                    class="card-btn"
                    @click="sendActReq(item.id)"
                  >立即报名</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NavTop from "@/components/NavTop";
import { isNullOrUndefined } from "util";
export default {
  name: "home",
  components: {
    NavTop
  },
  data() {
    return {
      clubType: "",
      navClubList: [],
      actList: [
        {
          id: '',
          photo_path: "",
          name: "",
          area: "",
          time: "",
          num: "",
          price: "",
          club: ""
        }
      ],
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
      ],
      userInfo: {
        name: "test",
        school: "test",
        department: "test",
        major: "test",
        signal: "test"
      },
      photoList: [
        "http://q0mybgzn5.bkt.clouddn.com/15dcabaf4096011573901207623",
        "http://q0mybgzn5.bkt.clouddn.com/15dcabaf4096011573901210126",
        "http://q0mybgzn5.bkt.clouddn.com/15dcabaf4096011574233839050",
        "http://q0mybgzn5.bkt.clouddn.com/15dcabaf4096011573901207623",
        "http://q0mybgzn5.bkt.clouddn.com/15dcabaf4096011573901210126",
        "http://q0mybgzn5.bkt.clouddn.com/15dcabaf4096011574233839050"
      ],
      avatarURL: require("../../assets/img/logo1.png"),
      isLogin: false,
      list: [
        "服务类社团",
        "康乐类社团",
        "生命类社团",
        "体能类社团",
        "学艺类社团",
        "思潮类社团",
        "其他社团"
      ],
      banners: [
        "http://q0mybgzn5.bkt.clouddn.com/15dcabaf4096011573901207623",
        "http://q0mybgzn5.bkt.clouddn.com/15dcabaf4096011573901207623",
        "http://q0mybgzn5.bkt.clouddn.com/15dcabaf4096011573901207623"
      ],
      swiperOption: {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      }
    };
  },
  created() {
    // this.windowHeight = window.innerHeight
    //判断登录是否过期
    let person = localStorage.getItem("person");
    person = JSON.parse(person);
    if (isNullOrUndefined(person["token"])) {
      this.isLogin = false;
    } else {
      let checkLogin = axios.create();
      checkLogin
        .post(
          this.$global.PHP_HOST + "/person/checklogin",
          {
            data: ""
          },
          {
            headers: {
              token: person["token"]
            }
          }
        )
        .then(() => {
          // localStorage.removeItem('person')
          // let user = res['data']['data']
          // localStorage.setItem('person',JSON.stringify(user))
          // let person = localStorage.getItem('person')
          this.userInfo.name = person["username"];
          this.userInfo.school = person["school"];
          this.userInfo.department = person["department"];
          this.userInfo.major = person["major"];
          this.userInfo.signal = person["signature"];
          this.isLogin = true;
        })
        .catch(() => {
          this.isLogin = false;
        });
    }
    let getClubList = axios.create();
    getClubList
      .get(this.$global.PHP_HOST + "/person/getclublist", {
        params: {
          data: ""
        },
        headers: {
          token: person["token"]
        }
      })
      .then(res => {
        this.banners = res["data"]["data"]["banner"];
        // this.clubInfo = res['data']['data']['info']
        this.clubInfo = Object.entries(res["data"]["data"]["info"]);
        for (let index = 0; index < this.clubInfo.length; index++) {
          this.clubInfo[index] = this.clubInfo[index][1];
        }
      })
      .catch(err => {
        console.log(err.response);
      });
    let getActList = axios.create();
    getActList
      .get(this.$global.PHP_HOST + "/person/getactlist", {
        params: {
          data: ""
        },
        headers: {
          token: person["token"]
        }
      })
      .then(res => {
        // console.log(res)
        this.actList = Object.entries(res["data"]["data"]);
        // console.log(this.actList)
        for (let index = 0; index < this.actList.length; index++) {
          this.actList[index] = this.actList[index][1];
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    toMyClub() {
      this.$router.push("/myclub");
    },
    chooseType(index) {
      console.log(index);
    },
    mouseIn(index) {
      this.navClubList = [];
      let person = localStorage.getItem("person");
      let user = JSON.parse(person);
      this.clubType = index;
      let getClubNameByType = axios.create();
      getClubNameByType
        .get(this.$global.PHP_HOST + "/person/getclubnamebytype", {
          params: {
            type: index
          },
          headers: {
            token: user["token"]
          }
        })
        .then(res => {
          this.navClubList = Object.entries(res["data"]["data"]);
          for (let index = 0; index < this.navClubList.length; index++) {
            this.navClubList[index] = this.navClubList[index][1];
          }
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    mouseOut() {
      this.clubType = "";
    },
    toLogin() {
      this.$router.push("login");
    },
    Logout() {
      this.isLogin = false;
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
      console.log(id)
      this.$router.push({ 
        name: "Club_info", 
        params: {
          c_id: id
        } 
      });
    },
    sendReq(id) {
      console.log(id);
    },
    showActInfo(id) {
      console.log(id)
      this.$router.push({ 
        name: "Activity_info", 
        params: {
          act_id: id
        } 
      });
    },
    navClub(id){
      this.$router.push({ 
        name: "Club_info", 
        params: {
          c_id: id
        } 
      });
    }
  }
};
</script>

<style scoped>
.nav-left {
  width: 64%;
  float: right;
}
.nav-list {
  width: 400px;
  height: 360px;
  background-color: #ffffff;
  position: absolute;
  top: 20px;
  left: 390px;
  z-index: 999;
  text-align: center;
}
.nav-list h3 {
  width: 100%;
  text-align: center;
  height: 50px;
  margin-top: 50px;
}
.type-list {
  width: 50%;
  float: right;
  height: 400px;
  background: #ffffff;
  padding: 10px;
}
.content-wrapper {
  width: 100%;
  background-color: #f8f8f8;
}
.swiper-wrapper {
  height: 360px !important;
  margin-top: 10px;
}
.swiper-img {
  width: 100%;
  height: 360px;
  object-fit: cover;
}
.login-btn1 {
  color: black;
  width: 100%;
  height: 100px;
  position: relative;
  bottom: 0px;
}
.swiper-pagination-bullet-active {
  background: #ffffff !important;
}
.nav-ul {
  list-style: none;
  background-color: #545c64;
}
.nav-ul li {
  height: 48px;
  line-height: 48px;
  color: #ffffff;
  text-align: center;
}
.nav-ul li h4 {
  background-color: #434a50;
}
.nav-ul li:hover {
  background-color: #434a50;
  cursor: pointer;
}
.person-info-bg {
  width: 64%;
  background-color: #ffffff;
  height: 360px;
  margin-top: 20px;
  box-shadow: 0px 0px 20px #e8e8e8;
}
.avatar-wrapper {
  width: 100%;
  height: 72px;
  padding-top: 20px;
}
#avatar {
  width: 48px;
  height: 48px;
  border: 6px solid #dfdfdf;
  border-radius: 60%;
  margin: auto;
  overflow: hidden;
}
#avatar img {
  width: 48px;
  height: 48px;
}
#no-login-text {
  color: #434a50;
  text-align: center;
}
#login-btn {
  margin: auto;
  margin-top: 28px;
}
#person-info ul {
  list-style: none;
  text-align: center;
  color: #9c9c9c;
}
#person-info ul li {
  height: 24px;
  line-height: 24px;
  font-size: 12px;
}
a {
  text-decoration: none;
  color: #9c9c9c;
  font-size: 12px;
}
a:hover {
  color: #37baa0;
}
.recommend-container {
  width: 84%;
  display: flex;
  flex-wrap: wrap;
  margin: auto;
}
.recommend {
  width: 48%;
  margin: auto;
  margin-top: 20px;
  background-color: #ffffff;
  height: 540px;
  box-shadow: 0px 0px 20px #e8e8e8;
  overflow: hidden;
}
.recommend h2 {
  padding: 20px;
  float: left;
  height: 36px;
  margin-bottom: 0%;
}
.card-bg {
  width: 100%;
  display: flex;
  flex-flow: wrap;
  justify-content: center;
}
.card {
  width: 180px;
  height: 210px;
  margin: 5px;
  color: #434a50;
}
.img-wrapper {
  width: 160px;
  height: 90px;
  margin: auto;
  margin-top: 10px;
  overflow: hidden;
}
.club-image {
  width: 90px;
  height: 90px;
  margin-left: 35px;
  object-fit: cover;
  transition: 1s;
}
.act-image {
  width: 160px;
  height: 90px;
  object-fit: cover;
  transition: 1s;
}
.image:hover {
  transform: scale(1.4, 1.4);
  filter: brightness(120%);
}
.text-wrapper {
  width: 100%;
  height: 90px;
  position: relative;
  font-size: 12px;
}
.club-title {
  position: absolute;
  top: 5px;
  left: 10px;
  font-size: 14px;
}
.club-num {
  position: absolute;
  width: 40%;
  left: 10px;
  top: 30px;
}
.club-school {
  position: absolute;
  top: 50px;
  left: 10px;
}
.club-level {
  position: absolute;
  top: 30px;
  right: 10px;
}
.club-type {
  position: absolute;
  top: 50px;
  right: 10px;
}
.club-btn {
  position: absolute;
  width: 140px;
  top: 70px;
  left: 20px;
  display: flex;
  justify-content: center;
}
.act-name {
  position: absolute;
  left: 10px;
  top: 5px;
  font-size: 16px;
}
.act-area {
  position: absolute;
  top: 30px;
  left: 10px;
  width: 60%;
  overflow: hidden;
}
.act-num {
  position: absolute;
  top: 30px;
  right: 0px;
  width: 30%;
  overflow: hidden;
}
.act-time {
  position: absolute;
  top: 50px;
  left: 10px;
}
/* .act-price{
  position: absolute;
  top: 10px;
  right: 15px;
} */
.act-price {
  position: absolute;
  top: 50px;
  right: 15px;
}
.act-btn {
  position: absolute;
  width: 140px;
  top: 70px;
  left: 20px;
  display: flex;
  justify-content: center;
}
.li-btn {
  margin-top: 10px;
}
</style>