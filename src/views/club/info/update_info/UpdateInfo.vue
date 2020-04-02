<template>
    <div id="update_info">
      <div class="content">
        <div class="form">
          <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="上传logo">
              <el-upload
                class="avatar-uploader"
                action="http://upload-z1.qiniup.com"
                :data="qn"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="社团名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="社团负责人">
              <el-input v-model="form.leader"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="学校">
              <el-input v-model="form.school"></el-input>
            </el-form-item>
            <el-form-item label="学院">
              <el-input v-model="form.department"></el-input>
            </el-form-item>
            <el-form-item label="社团类型">
              <el-input v-model="form.type"></el-input>
            </el-form-item>
            <el-form-item label="上传banner">
              <el-upload
                class="avatar-uploader"
                action="http://upload-z1.qiniup.com"
                :data="banner"
                :show-file-list="false"
                :on-success="handleBannerSuccess">
                <img v-if="imageUrl" :src="bannerImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">提交修改</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
	name: 'Update_info',
	data () {
		return {
      inject: ['reload'],
			imageUrl: '',
			qn: {
				token: '',
				key: '112'
      },
			banner: {
				token: '',
				key: '112'
      },
      bannerImg: '',
      club_token: '',
      form: {
        name: '',
        phone: '',
        leader: '',
        email: '',
        type: '',
        school: '',
        department: ''
      }
		}
	},
	methods: {
    handleAvatarSuccess(res, file) {
      console.log('upload photo')
			this.imageUrl = this.$global.QN_URL + res.key
			console.log('upload successed'+file.size)
      console.log(this.imageUrl)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleBannerSuccess(res, file) {
      console.log('upload banner')
			this.bannerImg = this.$global.QN_URL + res.key
			console.log('upload successed'+file.size)
      console.log(this.bannerImg)
    },
    // beforeAvatarUpload(file) {
    //   // const isJPG = file.type === 'image/jpeg'
    //   // const isLt2M = file.size / 1024 / 1024 < 2
    //   // if (!isJPG) {
    //   //   this.$message.error('上传头像图片只能是 JPG 格式!')
    //   // }
    //   // if (!isLt2M) {
    //   //   this.$message.error('上传头像图片大小不能超过 2MB!')
    //   // }
    //   // return isJPG && isLt2M
    // },
    onSubmit: function(){
      let club = sessionStorage.getItem("club")
      club = JSON.parse(club)
      let updateInfo = axios.create()
      updateInfo.post(this.$global.PHP_HOST + '/club/update',{
        'c_id': club['id'],
        'club_name': this.form.name,
        'club_leader': this.form.leader,
        'phone': this.form.phone,
        'email': this.form.email,
        'school': this.form.school,
        'department': this.form.department,
        'type': this.form.type,
        'logo_path': this.imageUrl,
        'banner': this.bannerImg
      },{
        headers: {
          'token': this.club_token
        }
      }).then(res=>{
        console.log(res)
        let result = res['data']['data']
        result['leader'] = result['club_leader']
        this.form.name = result['club_name']
        this.form.leader = result['club_leader']
        this.form.phone = result['phone']
        this.form.email = result['email']
        this.form.school = result['school']
        this.form.department = result['department']
        this.form.type = result['type']
        alert(res['data']['message'])
        sessionStorage.removeItem('club')
        sessionStorage.setItem('club',JSON.stringify(result))
        // this.reload()
      }).catch(error=>{
        console.log(error.response)
      })
    }
	},
	created(){
    let club = sessionStorage.getItem("club")
    club = JSON.parse(club)
    this.club_token = club["token"]
		let getUploadToken = axios.create()
    getUploadToken.post(this.$global.PHP_HOST + '/club/uploadtoken',{
      'data': ''
    },{
			headers: {
        'token': this.club_token
      }
		}).then(res=>{
      this.qn.token = res['data']['data']
      this.banner.token = res['data']['data']
      let time = (new Date()).getTime()
      console.log(time)
      this.qn.key = club['id'] + time
      this.banner.key = 'banner_' + time
      this.imageUrl = club['logo_path']
      console.log(this.qn.token)
		}).catch(error=>{
      console.log(error)
    })
    let getInfo = axios.create()
    getInfo.post(this.$global.PHP_HOST + '/club/getinfo',
    {
      data: ''
    },{
      headers: {
        'token': this.club_token
      }
    }).then(res=>{
      console.log(res)
      let result = res['data']['data']
      this.form.name = result['club_name']
      this.form.leader = result['club_leader']
      this.form.phone = result['phone']
      this.form.email = result['email']
      this.form.school = result['school']
      this.form.department = result['department']
      this.form.type = result['type']
    }).catch(error=>{
      console.log(error.response)
    })
	}
}
</script>

<style>
#update_info{
  width: 100%;
}
.content{
  width: 100%;
  margin: auto;
}
.form{
  width: 40%;
  margin: auto;
  margin-top: 10px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar-uploader .el-upload:hover {
  border-color: #37baa0;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>