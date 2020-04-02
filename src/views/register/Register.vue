<template>
  <div class="register">
    <div class="content">
      <div class="reg-form">
        <ul class="tab-title">
          <li @click="cur=0" :class="{active:cur==0}">个人注册</li>
          <li @click="cur=1" :class="{active:cur==1}">社团注册</li>
        </ul>
        <div class="tab-content">
          <div id="person-reg" class="reg-form-bg" v-show="cur==0">
            <el-form id="person-reg-form" :model="person_form" :rules="person_rules" ref="person_form" :inline="true" label-width="120px">
              <el-form-item label="用户名(昵称)" prop="username">
                <el-input v-model="person_form.username"></el-input>
              </el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="person_form.name"></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="tel">
                <el-input v-model="person_form.tel"></el-input>
              </el-form-item>
              <el-form-item label=" " prop="getCode">
                <el-button @click="getVerCode" :disabled="!show_btn" v-model="person_form.getCode">
                  <span v-show="show_btn">获取验证码</span>
                  <span v-show="!show_btn">重新获取({{count}})</span>
                </el-button>
              </el-form-item>
              <el-form-item label="验证码" prop="vercode">
                <el-input v-model="person_form.vercode"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="person_form.password" type="password"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="re_password">
                <el-input v-model="person_form.re_password" type="password"></el-input>
              </el-form-item>
              <el-form-item label=" ">
                <el-radio v-model="person_form.gender" label="男">男</el-radio>
                <el-radio v-model="person_form.gender" label="女">女</el-radio>
              </el-form-item>
              <el-form-item label=" ">
                <el-button type="primary" @click="onUserReg">立即创建</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div id="class-reg" class="reg-form-bg" v-show="cur==1">
            <el-form id="club-reg-form" :model="club_form" :rules="club_rules" ref="club_form" :inline="true" label-width="120px">
              <el-form-item label="社团名称" prop="name">
                <el-input v-model="club_form.name"></el-input>
              </el-form-item>
              <el-form-item label="负责人姓名" prop="leader">
                <el-input v-model="club_form.leader"></el-input>
              </el-form-item>
              <el-form-item label="负责人电话" prop="phone">
                <el-input v-model="club_form.phone"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="club_form.password" type="password"></el-input>
              </el-form-item>
              <el-form-item label="学校" prop="school">
                <el-input v-model="club_form.school"></el-input>
              </el-form-item>
              <el-form-item label="学院" prop="department">
                <el-input v-model="club_form.department"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="club_form.email"></el-input>
              </el-form-item>
              <el-form-item label="人数" prop="number">
                <el-input v-model="club_form.number"></el-input>
              </el-form-item>
              <el-form-item label="分类" prop="type">
                <el-input v-model="club_form.type"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onClubReg">立即注册</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    //手机号
    var validatePhone = (rule, value, callback) => {
      if (/^1[34578]{1}\d{9}$/.test(value) == false) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    // 密码
    var validatePass = (rule, value, callback) => {
      if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,20}$/.test(value) == false) {
        callback(new Error("6-20位密码包含大小写字母和数字"));
      } else {
        callback();
      }
    };
    // 确认密码
    var validatePass2 = (rule, value, callback) => {
      if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,20}$/.test(value) == false) {
        callback(new Error("请输入6-20位密码，必须包含大小写字母和数字"));
      } else if (value !== this.person_form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      cur: 0,
      person_form: {
        username: '',
        name: '',
        tel: '',
        val: '',
        password: '',
        re_password: '',
        school: '',
        gender: '',
        getCode: '',
        age: '',
        vercode: ''
      },
      club_form: {
        name: '',
        phone: '',
        school: '',
        leader: '',
        department: '',
        email: '',
        number: '',
        type: '',
        password: ''
      },
      show_btn: true,
      TIME_COUNT: 60,
      count: '',
      person_rules: {
        username: [
          { required: true, message: '请输入用户名' }
        ],
        tel: [
          { required: true, message: '请输入手机号'},
          { validator: validatePhone}
        ],
        password: [{
          required: true,
          message: '请输入密码'
        },{
          validator: validatePass
        }],
        re_password: [{
          required: true,
          message: '请再次输入密码'
        },{
          validator: validatePass2
        }],
        vercode: [{
          required: true,
          message: '请输入验证码'
        }]
      },
      club_rules: {
        name: [{
          required: true,
          message: '请输入社团名称'
        }],
        phone: [{
          required: true,
          message: '请输入负责人手机号'
        },{
          validator: validatePhone
        }],
        school: [{
          required: true,
          message: '请输入学校'
        }],
        leader: [{
          required: true,
          message: '请输入负责人姓名'
        }],
        email: [{
          required: true,
          message: '请输入邮箱'
        }],
        password: [{
          required: true,
          message: '请输入密码'
        },{
          min: 8,
          max: 20,
          message: '密码长度为8~20个字符'
        }]
      }
    }
  },
  methods: {
    getVerCode(){
      if(!this.timer){
        this.count = this.TIME_COUNT
        this.show_btn = false
        //发送验证码
        if(this.person_form.tel == ''){
          alert('请填写手机号')
        }else{
          console.log(this.person_form.tel)
          let getUserCode = axios.create()
          getUserCode.post('http://localhost/identifycode',{
            'id' : this.person_form.tel
          }).then(res=>{
            console.log(res)
          }).catch(error=>{
            console.log(error.response)
          })
          alert('手机号已发送，请注意查收')
        }
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= this.TIME_COUNT) {
            this.count--;
          } else {
            this.show_btn = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000)
      }
    },
    onUserReg: function(){
      console.log(this.person_form)
      let regUser = axios.create()
      regUser.post('http://localhost/person/register',{
        'username': this.person_form.username,
        'name': this.person_form.name,
        'phone': this.person_form.tel,
        'password': this.person_form.password,
        'code': this.person_form.vercode,
        'school': this.person_form.school,
        'gender': this.person_form.gender,
        'age': this.person_form.age
      }).then(res=>{
        alert(res['data']['message'])
        this.$router.push('/login')
      }).catch(error=>{
        console.log(error.response)
      })
    },
    onClubReg: function(){
      console.log(this.club_form)
      let regInfo = this.club_form
      let regClub = axios.create()
      regClub.post('http://localhost/club/register',{
        'club_name': regInfo.name,
        'club_leader': regInfo.leader,
        'school': regInfo.school,
        'department': regInfo.department,
        'phone': regInfo.phone,
        'email': regInfo.email,
        'number': regInfo.number,
        'type': regInfo.type,
        'password': regInfo.password
      }).then(res=>{
        alert(res['data']['message'])
        this.$router.push('/login')
      }).catch(error=>{
        console.log(error.response)
      })
    }
  },
  components: {}
}
</script>

<style scoped>
.content {
  position: relative;
  top: 0;
  width: 100%;
  text-align: center;
  background-color: #f4f4f4;
  background-image: url("../../assets/img/reg_bg.png");
  background-size: 100%;
  background-repeat: no-repeat;
  height: 800px;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.reg-form {
  padding-top: 30px;
  width: 50%;
  text-align: center;
  height: 750px;
  margin: auto;
  background-color: #ffffff;
  padding-left: 4%;
  border-radius: 15px;
  box-shadow: 0 0 10px #a3a3a3;
}
.tab-title {
  list-style: none;
  width: 60%;
  height: 48px;
  margin: auto;
  text-align: center;
  color: #848484;
}
.tab-title .active {
  background-color: #37baa0;
  color: #ffffff;
}
.tab-title li {
  float: left;
  width: 50%;
  height: 48px;
  line-height: 48px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
}
.tab-content {
  width: 92%;
}
.reg-form-bg{
  margin: auto;
  margin-top: 30px;
  width: 50%;
}
#person-reg-form{
  width: 100%;
  height: 200px;
}
#class-reg-form{
  width: 100%;
  height: 200px;
}
</style>