<template>
  <div id="myclub">
    <div class="header">
      <div class="nav-wrapper">
        <ul>
          <el-row :gutter="0">
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
              <li>
                <el-row :gutter="0">
                  <el-col :span="4" :offset="10">
                    <div id="logo-wrapper">
                      <img :src="logo" id="logo" alt="logo" />
                    </div>
                  </el-col>
                  <el-col :span="4" :offset="6">
                    <i class="el-icon-caret-bottom" id="show-list" @click="showList" v-if="btnShow&&!top"></i>
                    <i class="el-icon-caret-top" id="show-list" @click="showList" v-if="btnShow&&top"></i>
                    <!-- <div id="show-list" @click="showList" v-if="btnShow">点我</div> -->
                  </el-col>
                </el-row>
              </li>
            </el-col>
            <!-- <transition-group tag="el-col" name="fade"> -->
              <el-col :key="0" :xs="24" :sm="2" :md="2" :lg="2" :xl="2" v-show="listShow||btnListShow">
                <li :key="0">
                    <a href="/">首页</a>
                </li>
              </el-col>            
              <el-col :key="1" :xs="24" :sm="2" :md="2" :lg="2" :xl="2"  v-show="listShow||btnListShow">
                <li :key="1">
                  <a href="/">个人中心</a>
                </li>
              </el-col>          
              <el-col :key="2" :xs="24" :sm="2" :md="2" :lg="2" :xl="2" v-show="listShow||btnListShow">
                <li :key="2">
                  <a href="/">帮助中心</a>
                </li>
              </el-col>            
              <el-col :key="3" :xs="24" :sm="2" :md="2" :lg="2" :xl="2" v-show="listShow||btnListShow">
                <li :key="3">
                  <a href="/">退出登录</a>
                </li>
              </el-col>              
            <!-- </transition-group> -->
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" hidden-xs-only></el-col>
          </el-row>
        </ul>
      </div>
    </div>
    <div class="container">
      <el-row :gutter="10">
        <el-col :xs="{span:24,offset:0}" :sm="{span:16,offset:4}" :md="{span:16,offset:4}">
          <div class="content">
            <div class="user-info">
              <div class="avatar-wrapper">
                <el-upload
                  class="avatar-uploader"
                  action="http://upload-z1.qiniup.com"
                  :data="qn"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
              <div class="user-info-text">
                <div class="username">
                  <h3>{{userInfo.username}}</h3>
                </div>
                <div class="update-info">编辑资料</div>
                <div class="level">用户等级:{{userInfo.level}}</div>
                <div class="hobby">兴趣爱好:{{userInfo.hobby}}</div>
                <div class="signature">个性签名:{{userInfo.signature}}</div>
              </div>
            </div>
            <div class="club-list">
              <div class="title">
                <h4>我的社团列表</h4>
              </div>
              <div class="list-item-wrapper">
                <el-row :gutter="10">
                  <el-col 
                    v-for="(item,index) in clubList"
                    :key="index"
                    :xs="24" 
                    :sm="12" 
                    :md="12" 
                    :lg="6" 
                    :xl="4" 
                    justify="center" 
                    >
                    <div class="list-item">
                      <div class="item-img-wrapper">
                        <img :src="item.banner" alt="">
                      </div>
                      <div class="item-text-wrapper">
                        <h4>{{item.club_name}}</h4>
                        <div class="item-school">
                          学校:{{item.school}}
                        </div>
                        <div class="item-number">
                          人数:{{item.number}}
                        </div>
                        <div class="item-type">
                          类型:{{item.type}}
                        </div>
                        <div class="item-level">
                          等级:{{item.level}}
                        </div>
                        <div class="item-info">
                          简介:{{item.club_info}}
                        </div>
                      </div>
                    </div>                  
                  </el-col>                 
                </el-row>
              </div>
            </div>
            <div class="act-list">
              <div class="title">
                <h4>我的活动列表</h4>
              </div>
              <div class="list-item-wrapper">
                <el-row :gutter="10">
                  <el-col 
                  v-for="(item,index) in actList"
                  :key="index"
                  :xs="24" 
                  :sm="12" 
                  :md="12" 
                  :lg="6" 
                  :xl="4" 
                  justify="center"
                  >
                     <div class="list-item">
                      <div class="item-img-wrapper">
                        <img :src="item.path" alt="">
                      </div>
                      <div class="item-text-wrapper">
                        <h4>{{item.name}}</h4>
                        <div class="item-school">
                          发起组织:{{item.club_name}}
                        </div>
                        <div class="item-number">
                          时间:{{item.time}}
                        </div>
                        <div class="item-type">
                          状态:{{item.status}}
                        </div>
                        <div class="item-level">
                          地点:{{item.area}}
                        </div>
                        <div class="item-info">
                          简介:{{item.desc}}
                        </div>
                      </div>
                    </div>       
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import "element-ui/lib/theme-chalk/display.css";
export default {
  name: "MyClub",
  data() {
    return {
      windowHeight:'',
      top: true,
			screenWidth: document.documentElement.clientWidth,
      listShow: true,
      btnListShow: false,
      btnShow: false,
      qn: {
        token: "",
        key: ""
      },
      userInfo: {
        avatar: "",
        username: "",
        hobby: "",
        level: "",
        signature: ""
      },
      clubList: [{
        club_name: '1111',
        school: '',
        type: '',
        level: '',
        number: '',
        banner: '',
        club_info: ''
      },{
        club_name: '2222',
        school: '',
        type: '',
        level: '',
        number: '',
        banner: '',
        club_info: ''
      }],
      actList: [],
      logo: require("@/assets/img/logo.png")
    };
  },
  created() {
    this.windowHeight = window.innerHeight
    this.screenWidth = window.innerWidth
    if(Number(this.screenWidth) <= 768){
      this.listShow = false
      this.btnShow = true
    }
    //获取用户个人信息
    let person = this.getLocalStorage();
    let getInfo = axios.create();
    getInfo
      .post(
        this.$global.PHP_HOST + "/person/getInfo",
        {
          data: ""
        },
        {
          headers: {
            token: person["token"]
          }
        }
      )
      .then(res => {
        // console.log(res);
        let result = res["data"]["data"];
        this.userInfo.avatar = result["avatar"];
        this.userInfo.username = result["username"];
        this.userInfo.hobby = result["hobby"];
        this.userInfo.signature = result["signature"];
      })
      .catch(err => {
        console.log(err)
      });
    //获取个人社团列表
    let getClubList = axios.create()
    getClubList.get(this.$global.PHP_HOST + '/person/getclublistbyuser',{
      params: {
        'u_id': person['id']
      },
      headers: {
        'token': person['token']
      }
    }).then(res=>{
      this.clubList = Object.entries(res['data']['data'])
      for (let i = 0; i < this.clubList.length; i++) {
        this.clubList[i] = this.clubList[i][1]        
      }
      // console.log(this.clubList)
    }).catch(err=>{
      console.log(err)
    })

    //获取个人活动列表
    let getActList = axios.create()
    getActList.post(this.$global.PHP_HOST + '/person/getuseractlist',{
      'u_id': person['id']
    },{
      headers: {
        token: person['token']
      }
    }).then(res=>{
      // console.log(res)
      let result = res['data']['data']
      let r = []
      for (let i = 0; i < result.length; i++) {
        r[i] = result[i][0]
        r[i]['time'] = this.timestampToTime(r[i]['time'])
      }
      this.actList = r
      console.log(this.actList)
    }).catch(err=>{
      console.log(err)
    })
	},
  methods: {
    timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = date.getDate() + ' ';
      var h = date.getHours() + ':';
      var m = date.getMinutes();
      // var s = date.getSeconds();
      return Y + M + D + h + m;
    },
    showList(){
      if(!this.btnListShow){
        this.btnListShow = true
        this.top = false
      }else{
        this.btnListShow = false
        this.top = true
      }
      console.log(this.btnListShow)
    },
    getLocalStorage() {
      let person = localStorage.getItem("person");
      person = JSON.parse(person);
      return person;
    },
    handleAvatarSuccess(res, file) {
      console.log("upload photo");
      this.userInfo.avatar = this.$global.QN_URL + res.key;
      console.log("upload successed" + file.size);
      console.log(this.userInfo.avatar);
    },
    beforeAvatarUpload(file) {
      let person = this.getLocalStorage();
      let getUploadToken = axios.create();
      getUploadToken
        .post(
          this.$global.PHP_HOST + "/person/getuploadtoken",
          {
            data: ""
          },
          {
            headers: {
              token: person["token"]
            }
          }
        )
        .then(res => {
          this.qn.token = res["data"]["data"];
          let time = new Date().getTime();
          this.qn.key = time;
        })
        .catch(error => {
          console.log(error)
        });
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
	},
	watch: {
		'screenWidth':function(val){ //监听屏幕宽度变化
			// console.log(val)
			if(Number(val) <= 768){
        this.listShow = false
        this.btnShow = true
			}else{
        this.listShow = true
        this.btnShow = false
			}
		},
	},
	mounted () {
		var _this = this;
		window.onresize = function(){ // 定义窗口大小变更通知事件
			_this.screenWidth = document.documentElement.clientWidth; //窗口宽度
	}
	}
}
</script>
<style scoped>
html,body {
  background-color: #f8f8f8;
  overflow: hidden;
  overflow-y: auto;
}
#myclub {
  background-color: #f8f8f8;
}
.header {
  width: 100%;
  border-bottom: 1px solid #cccccc;
  background-color: #ffffff;
}
.nav-wrapper {
  width: 100%;
}
.nav-wrapper ul {
  width: 100%;
  list-style: none;
	background-color: #ffffff;
  display: block;
  z-index: 999;
  border-bottom: 1px solid #e2e2e2;
}
.nav-wrapper ul li {
	text-align: center;
  height: 60px;
  line-height: 60px;
}
.nav-wrapper ul li a:hover {
  cursor: pointer;
  color: #37baa0;
  z-index: 999;
}
.nav-wrapper ul li a {
  color: #888888;
  font-size: 16px;
  text-align: center;
  z-index: 999;
  text-decoration: none;
}
#logo-wrapper {
  width: 36px;
  height: 36px;
  overflow: hidden;
  border: 3px solid #ffffff;
  border-radius: 60%;
  box-shadow: 0 0 5px #a0a0a0;
  margin: auto;
  margin-top: 10px;
}
#logo {
  width: 36px;
  height: 36px;
  object-fit: contain;
}
#show-list:hover{
  cursor: pointer;
  color: #37baa0;
}
.user-info {
  height: 160px;
  background: #ffffff;
  display: flex;
  align-items: center;
  box-shadow: 0 0 5px #d8d8d8;
}
.content {
  width: 100%;
  margin-top: 20px;
}
.avatar-wrapper {
  width: 100px;
  height: 100px;
  padding: 0;
  margin-left: 20px;
  border-radius: 10%;
  overflow: hidden;
  box-shadow: 0 0 5px #dbdbdb;
}
.avatar-wrapper img {
  width: 100px;
  height: 100px;
}
.user-info-text {
  width: 100%;
  height: 100px;
  display: block;
  margin-left: 20px;
  position: relative;
}
.username {
  position: absolute;
  top: 0;
}
.update-info {
  position: absolute;
  top: 5px;
  left: 25%;
  font-size: 12px;
  color: #888888;
}
.level {
  position: absolute;
  top: 40%;
  font-size: 14px;
  color: #888888;
}
.hobby {
  position: absolute;
  top: 40%;
  left: 25%;
  font-size: 14px;
  color: #888888;
}
.signature {
  position: absolute;
  bottom: 0;
  font-size: 14px;
  color: #888888;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.club-list{ 
  margin-top: 20px;
  background: #ffffff;
  box-shadow: 0 0 5px #d8d8d8;
}
.act-list{
  margin-top: 20px;
  background: #ffffff;
  box-shadow: 0 0 5px #d8d8d8;
}
.title{
  padding-top: 20px;
  margin-left: 20px;
}
.list-item-wrapper{
  width: 96%;
  margin: auto;
  margin-top: 20px;
}
.list-item{
  height: 300px;
  margin-bottom: 20px;
  overflow: hidden;
}
.item-img-wrapper{
  width: 96%;
  margin: auto;
  overflow: hidden;
  padding-top: 4px;
  height: 144px;
}
.item-img-wrapper img{
  width: 100%;
  height: 144px;
  object-fit: cover;
}
.item-text-wrapper{
  width: 96%;
  margin: auto;
  color: #6d6d6d;
}
.item-text-wrapper h4{
  color: #353535;
}
</style>