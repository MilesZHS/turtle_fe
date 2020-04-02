<template>
  <div class="login" v-bind:style="{height: windowHeight + 'px'}">
    <div class="form-wrapper">
      <div class="tab">
        <div class="tabBtn" @click="cur = 0" :class="{active:cur == 0}" >用户登录</div>
        <div class="tabBtn" @click="cur = 1" :class="{active:cur == 1}" >社团登录</div>
      </div>
      <div class="form">
        <div id="user-form" v-show="cur==0">
          <el-form ref="userForm" :model="userForm" :rules="userRules" label-width="120px">
            <el-form-item label="手机号" prop="phone">
              <el-col :span="17">
                <el-input v-model="userForm.phone" placeholder="请输入手机号"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
              <el-col :span="8">
                <el-input placeholder="请输入验证码" v-model="userForm.code"></el-input>  
              </el-col>
              <el-col :span="2">
                <el-button @click="getUserCodeBtn" :disabled="!show_btn">
                  <span v-show="show_btn">点击获取验证码</span>
                  <span v-show="!show_btn">重新获取 ({{count}})</span>
                </el-button>
              </el-col>
            </el-form-item>
            <el-form-item label=" ">              
              <el-col :span="16">
                <el-button type="primary" @click="onUserLogin" id="login-btn">登录</el-button>
              </el-col>
            </el-form-item>
          </el-form>
        </div>
        <div id="club-form" v-show="cur==1">
          <el-form ref="clubForm" :model="clubForm" :rules="clubRules" label-width="120px">
            <el-form-item label="手机号" prop="phone">
              <el-col :span="16">
                <el-input v-model="clubForm.phone" placeholder="请输入手机号"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="密  码" prop="password">
              <el-col :span="16">
                <el-input v-model="clubForm.password" placeholder="请输入密码" type="password"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label=" ">              
              <el-col :span="16">
                <el-button type="primary" @click="onClubLogin" id="login-btn">登录</el-button>
              </el-col>
            </el-form-item>
          </el-form>
        </div>
        <div id="club-register">
          <router-link to="/register">立即注册</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
// import { isNull } from 'util';
export default {
  name: 'Login',
  data () {
    var validatePhone = (rule, value, callback) => {
      if (/^1[34578]{1}\d{9}$/.test(value) == false) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    }
    return {
      cur: 0,
      data: {
        phone: '18560677018',
        code: '464564',
      },
      token: '',
      windowHeight: 0,
      userForm: {
        phone: '',
        code: ''
      },
      userRules: {
        phone: [{
          required: true,
          message: '请输入手机号'
        },{
          validator: validatePhone
        }],
        code: [{
          required: true,
          message: '请输入验证码'
        },{
          min: 6,
          max: 6,
          message: '验证码为6位'
        }]
      },
      clubForm: {
        phone: '',
        password: ''
      },
      clubRules: {
        phone: [{
          required: true,
          message: '请输入手机号'
        },{
          validator: validatePhone
        }],
        password: [{
          required: true,
          message: '请输入密码'
        }]
      },
      show_btn: true,
      show_btn1: true,
      count: 0,//个人用户重新获取验证码倒计时
      count1: 0,//社团重新获取验证码倒计时
      TIME_COUNT: 60
    }
  },
  created(){
    this.windowHeight = window.innerHeight
    console.log(this.windowHeight)
  },
  methods: {
    onClickSubmit: function(){
    },
    onUserLogin: function(){
      console.log('userlogin')
      if(this.userForm.phone == ''){
        alert('请输入手机号')
      }else if(this.userForm.code == ''){
        alert('请输入验证码')
      }else{
        let userLoginReq = axios.create()
        userLoginReq.post(this.$global.PHP_HOST+'/person/login',{
          'phone': this.userForm.phone,
          'code': this.userForm.code
        }).then(res=>{
          if(res['data']['data']['token'] != ''){
            let user = res['data']['data']
            localStorage.setItem('person',JSON.stringify(user))
            let person = localStorage.getItem('person')
            console.log(person)
            this.$router.push('/')
            console.log('跳转')
          }
        }).catch(error=>{
          console.log(error.response)
          alert(error.response['data']['message'])
        })
      }
    },
    onClubLogin: function(){
      console.log(this.clubForm.phone)
      let clubLogin = axios.create()
      clubLogin.post(this.$global.PHP_HOST + '/club/login',{
        'phone': this.clubForm.phone,
        'password': this.clubForm.password
      }).then(res=>{
        console.log(res)
        let club = res['data']['data']
        sessionStorage.setItem('club',JSON.stringify(club))
        console.log('缓存成功'+club['token'])
        alert('登录成功')
        this.$router.push('/club')
      }).catch(error=>{
        console.log(error)
      })
    },
    getUserCodeBtn: function(){
      if(!this.timer){
        this.count = this.TIME_COUNT
        this.show_btn = false

        //发送验证码
        if(this.userForm.phone == ''){
          alert('请填写手机号')
        }else{
          console.log(this.userForm.phone)
          let getUserCode = axios.create()
          getUserCode.post(this.$global.PHP_HOST + '/identifycode',{
            'id' : this.userForm.phone
          }).then(res=>{
            console.log(res)
          }).catch(error=>{
            console.log(error.response)
          })
          alert('手机号已发送，请注意查收')
          this.timer = setInterval(()=>{
            if(this.count > 0 && this.count <= this.TIME_COUNT){
              this.count--
            }else{
              this.show_btn = true
              clearInterval(this.timer)
              this.timer = null
            }
          },1000)
        }        
      }
    },
  }
}
</script>

<style scoped>
.login{
  margin: 0%;
  padding: 0%;
  width: 100%;
  overflow: hidden;
  background: url('/img/login.png') no-repeat center;
}
.form-wrapper{
  width: 32%;
  position: relative;
  height: 420px;
  top: 24%;
  left: 57%;
}
h2{
  margin: auto;
  text-align: center;
  color: #6d6d6d;
}
.tab{
  width: 100%;
  height: 24px;
  line-height: 24px;
  text-align: center;
}
.tabBtn{
  width: 50%;
  color: #848484;
  float: left;
}
.tabBtn:hover{
  cursor: pointer;
}
.active{
  color: #37baa0;
  cursor: pointer;
  border-bottom: 2px solid #37baa0;
}
.form{
  margin-top: 60px;
  width: 100%;
  height: 360px;
}
#login-btn{
  width: 100%;
}
#club-register{
  width: 100%;
  text-align: center;
}
#club-register a{
  text-decoration: none;
  color: #848484;
  font-size: 12px;
}
#club-register:hover a{
  cursor: pointer;
  color: #37baa0;
}
</style>

