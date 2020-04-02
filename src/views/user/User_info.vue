<template>
    <div id="user">    <!--背景图层面板-->
        <div id="user_info_main">  <!--主体白框-->
            <div class="main_form" ref="user_info_form" :inline="true"> <!--主体表单-->
                <b style="font-size:30px">个人信息完善</b>
                <el-form id="person_info_form" ref="person_info" :model="person_info" label-width="80px">
                <el-form-item label="头像上传">
                    <el-upload
                        class="avatar-uploader"
                        action="http://upload-z1.qiniup.com"
                        :data="qn"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    </el-form-item>
                    <el-form-item label="昵称">
                        <el-input v-model="person_info.name"></el-input>
                    </el-form-item>
                    <el-form-item label="绑定手机"> <!--未完成-->
                        <el-input v-model="person_info.tel"></el-input>
                    </el-form-item>
                    <el-form-item label="学校">
                        <el-select v-model="person_info.school" placeholder="请选择学校">
                        <el-option label="青岛大学" value="青岛大学"></el-option>
                        <el-option label="青岛农业大学" value="青岛农业大学"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="专业">
                        <el-select v-model="person_info.speciality" placeholder="请选择专业">
                        <el-option label="软件工程" value="软件工程"></el-option>
                        <el-option label="计算机科学与技术" value="计算机科学与技术"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio label="男" v-model="person_info.sex"></el-radio>
                        <el-radio label="女" v-model="person_info.sex"></el-radio>
                    </el-form-item>
                    <el-form-item label="生日">
                        <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="person_info.birthday" style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="兴趣爱好">
                        <el-input v-model="person_info.hobby"></el-input>
                    </el-form-item>
                    <el-form-item label="个性签名">
                        <el-input v-model="person_info.signature"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交更新</el-button>    
                        <el-button type="primary" @click="onSubmit">更改密码</el-button>    <!--未完成-->
                        <el-button type="primary" @click="cancelSubmit">注销</el-button>    <!--未完成-->
                    </el-form-item>
                    <el-form-item>
                        <el-button>返回</el-button> <!--未完成-->
                    </el-form-item>
                    
                </el-form>
                
            </div> 
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'User_info',
    data() {
      return {
        person_info: {
          name: '',
          password:'',
          tel:'',
          school:'',
          speciality:'',
          sex: '',
          birthday: '',
          hobby:'',
          signature:''
        },
        qn: {
            token: '',
            key: 'avatar'
        },
        windowHeight: '',
        imageUrl: ''
      }
    },
    created(){
        this.windowHeight = window.innerHeight
        console.log(this.windowHeight)
        let getInfo = axios.create()
        let person = localStorage.getItem('person')
        person = JSON.parse(person)
        console.log(person['token'])
        getInfo.post(this.$global.PHP_HOST + '/person/getinfo',{
            'data': ''
        },{
            headers: {
                'token': person['token']
            }
        }).then(res=>{
            console.log(res)
            let result = res['data']['data']
            this.person_info.name = result['name']
            this.person_info.tel=result['phone']
            this.person_info.school=result['school']
            this.person_info.speciality=result['major']
            this.person_info.sex=result['gender']
            this.person_info.hobby=result['hobby']
            this.person_info.signature=result['signature']
            this.person_info.birthday=result['birthday']
            this.imageUrl = result['avatar']
        }).catch(error=>{
            console.log(error.response)
        })
        //获取图片上传token
        let getUploadToken = axios.create()
        getUploadToken.post(this.$global.PHP_HOST + '/club/uploadtoken',{
            'data': ''
        },{
            headers: {
            'token': person['token']
            }
        }).then(res=>{
            this.qn.token = res['data']['data']
            let time = (new Date()).getTime()
            this.qn.key = time
            this.imageUrl = person['avatar']
            console.log(this.qn.token)
        }).catch(error=>{
            console.log(error)
        })
    },
    methods: {
        handleAvatarSuccess(res) {
            this.imageUrl = this.$global.QN_URL + res.key
            console.log(this.imageUrl)
        },
        onSubmit() {
            let person = localStorage.getItem('person')
            person = JSON.parse(person)
            let update = axios.create()
            update.post(this.$global.PHP_HOST + '/person/updateinfo',{
                'id': person['id'],
                'avatar': this.imageUrl,
                'name': this.person_info.name,
                'phone': this.person_info.tel,
                'school': this.person_info.school,
                'major': this.person_info.speciality,
                'gender': this.person_info.sex,
                'birthday': this.person_info.birthday,
                'hobby': this.person_info.hobby,
                'signature': this.person_info.signature
            },{
                headers: {
                    'token': person['token']
                }
            }).then(res=>{
                let message = res['data']['message']
                res = res['data']['data']
                this.imageUrl = res['avatar']
                this.person_info.name = res['name']
                this.person_info.tel = res['phone']
                this.person_info.school = res['school']
                this.person_info.speciality = res['major']
                this.person_info.sex = res['gender']
                this.person_info.birthday = res['birthday']
                this.person_info.hobby = res['hobby']
                this.person_info.signature = res['signature']
                // localStorage.removeItem('person')
                // localStorage.setItem('person',JSON.stringify(res))
                alert(message)
            }).catch(err=>{
                console.log(err)
            })
        },
        cancelSubmit(){
            console.log("This user want to cancel this account……");
            alert("Are you sure to cancel this account? This opertion is Irrevocable!")

        }
    }
}
</script>

<style>
    #user{
        width: 100%;
        background:url("/img/reg_bg.png") no-repeat center;
        text-align:center;
        overflow: hidden;
    }
    #user_info_main{
        margin-top: 30px;
        padding: 30px;
        background:white;
        width: 75%;
        line-height: 30px;
        display: inline-block;
        vertical-align: middle;
        border-radius: 3%;
        box-shadow: 5px 5px 10px #999;
    }
    
</style>