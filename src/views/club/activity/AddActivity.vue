<template>
	<div id="add">
		<div class="content">
			<div>
				<h2>活动发布</h2>
			</div>
			<el-form ref="form" :model="form" label-width="120px">
				<el-form-item label="活动名称">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="活动地点">
					<el-input v-model="form.area"></el-input>
				</el-form-item>
				<el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
				</el-form-item>
				<el-form-item label="活动人数">
					<el-input v-model="form.num"></el-input>
				</el-form-item>
				<el-form-item label="活动价格">
					<el-input v-model="form.price"></el-input>
				</el-form-item>
				<el-form-item label="活动负责人">
					<el-input v-model="form.administrator"></el-input>
				</el-form-item>
        <el-form-item label="联系方式">
					<el-input v-model="form.phone"></el-input>
				</el-form-item>
        <el-form-item label="活动状态">
					<el-select v-model="form.status" placeholder="请选择">
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
         <el-form-item label="活动简介">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
				<el-form-item label="照片上传">
					<el-upload
						action="http://upload-z1.qiniup.com"
						:data="qn"
						list-type="picture-card"
						:on-preview="handlePictureCardPreview"
						:on-remove="handleRemove"
						:before-upload="beforeUploadGetKey"
						:on-success="handleSuccess">
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">点击提交</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
import axios from 'axios'
export default {
	name: 'AddActivity',
	methods: {
		onSubmit() {
			let club = sessionStorage.getItem('club')
			club = JSON.parse(club)
			let token = club['token']
			let postEqui = axios.create()
			postEqui.post(this.$global.PHP_HOST+'/club/addactivity',{
				'name': this.form.name,
				'num': this.form.num,
				'status': this.form.status,
				'phone': this.form.phone,
				'administrator': this.form.administrator,
				'time': this.form.date2,
				'area': this.form.area,
				'desc': this.form.desc,
				'path': this.photo_path,
				'c_id': club['id'],
				'price': this.form.price
			},{
				headers: {
					'token': token
				}
			}).then(res=>{
        alert(res['data']['message'])
        let result = res['data']['data']
        console.log(result['time'])
			}).catch(err=>{
				console.log(err.response)
			})
		},
		handleRemove(file, fileList) {
			console.log(file, fileList)
		},
		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.url
			this.dialogVisible = true
		},
		beforeUploadGetKey() {   //每个文件上传之前 给它一个 名字
			let time = (new Date()).getTime()
			this.qn.key = 'activity/' + this.c_id + time
		},
		handleSuccess(res){
			this.photo_path.push(this.$global.QN_URL + res.key)
			console.log(this.photo_path)
		}
	},
	created () {
		let club = sessionStorage.getItem("club")
    club = JSON.parse(club)
		let token = club["token"]
		this.c_id = club['id']
		let getUploadToken = axios.create()
		getUploadToken.post(this.$global.PHP_HOST + '/club/uploadtoken',
		{
			'data': ''
		},{
			headers: {
				'token': token
			}
		}).then(res=>{
      this.qn.token = res['data']['data']
		}).catch(error=>{
      console.log(error)
    })
	},
	data () {
		return {
			c_id: '',
			dialogImageUrl: '',
			dialogVisible: false,
			form: {
				name: '',
				num: '',
				status: '',
				phone: '',
				administrator: '',
				date1: '',
				date2: '',
				area: '',
				desc: '',
				price: ''
			},
			options: [{
				value: '0',
				label: '0-策划中'
			}, {
				value: '1',
				label: '1-准备中'
			}, {
				value: '2',
				label: '2-开始报名'
			}, {
				value: '3',
				label: '3-报名截止'
			}, {
				value: '4',
				label: '4-进行中'
			}, {
				value: '5',
				label: '5-已结束'
			}],
			qn: {
				token: '',
				key: ''
			},
			photo_path: []
		}
	}
}
</script>
<style>
.content{
	width: 50%;
	margin: auto;
	margin-top: 20px;
}
h2{
	text-align: center;
	margin-bottom: 20px;
}
</style>