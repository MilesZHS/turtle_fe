<template>
	<div id="add">
		<div class="content">
			<div>
				<h2>设备登记</h2>
			</div>
			<el-form ref="form" :model="form" label-width="120px">
				<el-form-item label="设备名称">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="设备数量">
					<el-input v-model="form.num"></el-input>
				</el-form-item>
				<el-form-item label="设备状态">
					<el-select v-model="form.value" placeholder="请选择">
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="设备价格">
					<el-input v-model="form.price"></el-input>
				</el-form-item>
				<el-form-item label="管理员">
					<el-input v-model="form.administrator"></el-input>
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
	name: 'AddEqui',
	methods: {
		onSubmit() {
			let club = sessionStorage.getItem('club')
			club = JSON.parse(club)
			let token = club['token']
			let postEqui = axios.create()
			postEqui.post(this.$global.PHP_HOST+'/club/addequi',{
				'c_id': this.c_id,
				'name': this.form.name,
				'num': this.form.num,
				'status': this.form.value,
				'price': this.form.price,
				'administrator': this.form.administrator,
				'path': this.photo_path
			},{
				headers: {
					'token': token
				}
			}).then(res=>{
				alert(res['data']['message'])
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
			this.qn.key = this.c_id + time
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
				price: '',
				administrator: '',
				value: ''
			},
			options: [{
				value: '0',
				label: '0-库存'
			}, {
				value: '1',
				label: '1-借出'
			}, {
				value: '2',
				label: '2-损坏'
			}, {
				value: '3',
				label: '3-丢失'
			}],
			qn: {
				token: '',
				key: '112'
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