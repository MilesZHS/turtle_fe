<template>
  <div id="club" :style="{height: windowHeight}">
    <div class="header">
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#ffffff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">
          <div id="logo-wrapper">
            <img :src="imgURL" id="logo" alt />
          </div>
        </el-menu-item>
        <el-menu-item index="2">社团管理中心</el-menu-item>
        <el-menu-item index="4" id="logout-btn" @click="logout">退出登录</el-menu-item>
        <el-menu-item index="3" id="logout-btn">当前用户:{{username}}</el-menu-item>
      </el-menu>
    </div>
    <div class="content">
      <div id="photo-upload" v-show="cur == '信息修改'">
        <update-info></update-info>
      </div>
      <div id="mumber-list" v-show="cur == '成员列表'">
        <member-list></member-list>
      </div>
      <div id="equi-list" v-show="cur == '设备列表'">
        <equi-list></equi-list>
      </div>
      <div id="add-equi" v-show="cur == '设备登记'">
        <add-equi></add-equi>
      </div>
      <div id="borrow-return" v-show="cur == '借还记录'">
        <borrow-return></borrow-return>
      </div>
      <div id="add-activity" v-show="cur == '活动发布'">
        <add-activity></add-activity>
      </div>
    </div>
    <div class="left-nav">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>社团管理</span>
          </template>
          <!-- <el-submenu index="1-1">
            <template slot="title">成员管理</template>
            <el-menu-item index="1-1-1" @click="cur = '成员列表'">成员列表</el-menu-item>
            <el-menu-item index="1-1-2" @click="cur = '添加成员'">添加成员</el-menu-item>
          </el-submenu> -->
          <el-menu-item index="1-1" @click="cur = '成员列表'">
            <span slot="title">成员管理</span>
          </el-menu-item>
          <el-submenu index="1-2">
            <template slot="title">设备管理</template>
            <el-menu-item index="1-2-1" @click="cur = '设备列表'">设备列表</el-menu-item>
            <el-menu-item index="1-2-2" @click="cur = '借还记录'">借还记录</el-menu-item>
            <el-menu-item index="1-2-3" @click="cur = '设备登记'">设备登记</el-menu-item>
          </el-submenu>
          <el-submenu index="1-3">
            <template slot="title">审批处理</template>
            <el-menu-item index="1-3-1">成员加入</el-menu-item>
            <el-menu-item index="1-3-2">设备借出</el-menu-item>
            <el-menu-item index="1-3-3">活动报名</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-edit"></i>
          <span slot="title" @click="cur = '信息修改'">信息修改</span>
        </el-menu-item>
        <el-menu-item index="3" @click="cur = '活动发布'">
          <i class="el-icon-location-outline"></i>
          <span slot="title">活动发布</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import { isNullOrUndefined } from "util"
import UpdateInfo from '@/views/club/info/update_info/UpdateInfo.vue'
import MemberList from '@/views/club/member/MemberList.vue'
import EquiList from '@/views/club/equi/EquiList.vue'
import AddEqui from '@/views/club/equi/AddEqui.vue'
import BorrowReturn from '@/views/club/equi/BorrowReturn.vue'
import AddActivity from '@/views/club/activity/AddActivity.vue'
export default {
  name: "Club",
  components: {
    UpdateInfo,
    MemberList,
    EquiList,
    AddEqui,
    BorrowReturn,
    AddActivity,
  },
  data() {
    return {
      windowHeight: '',
      activeIndex2: "",
      username: "hhh",
      cur: '信息修改',
      imgURL: ''
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    logout: function() {
      let logout = axios.create()
      logout.get(this.$global.PHP_HOST + "/club/logout").then(() => {
          sessionStorage.removeItem("club")
          this.$router.push("/login")
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  created() {
    this.windowHeight = window.innerHeight
    let club = sessionStorage.getItem("club")
    if(isNullOrUndefined(club)){
      alert('请先登录')
      this.$router.push('/login')
    }
    club = JSON.parse(club)
    this.username = club["leader"]
    let token = club["token"]
    this.imgURL = club['logo_path']
    console.log(club)
    if (isNullOrUndefined(token)) {
      alert("请先登录")
      this.$router.push('/login')
    }    
  }
}
</script>

<style scoped>
#club{
  width: 100%;
  margin: 0%;
  padding: 0%;
}
.header {
  width: 100%;
  overflow: hidden;
}
#logo-wrapper{
  width: 36px;
  height: 36px;
  border-radius: 60%;
  border: 2px solid #fff;
  overflow: hidden;
  display: flex;
  align-self: center;
  margin-top: 10px;
}
#logo {
  width: 36px;
}
#logout-btn {
  float: right;
}
.left-nav{
  width: 15%;
  overflow: hidden;
}
.content{
  width: 85%;
  float: right;
  margin: 0%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>