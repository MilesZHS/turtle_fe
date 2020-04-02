<template>
  <div id="list">
		<div class="form-header">			
			<div style="width: 80%;float:left;">
				<el-input placeholder="请输入内容" v-model="search_input" class="input-with-select">
					<el-select v-model="select" slot="prepend" placeholder="请选择查询条件">
						<el-option label="姓名" value="1"></el-option>
						<el-option label="手机号" value="2"></el-option>
						<el-option label="学校" value="3"></el-option>
						<el-option label="全部" value="4"></el-option>
					</el-select>
					<el-button slot="append" @click="onSearch" icon="el-icon-search"></el-button>
				</el-input>
			</div>
			<el-button @click="toggleSelection()">取消选择</el-button>
			<!-- <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
		</div>
    <el-table ref="multipleTable" :data="tableData" stripe style="width: 100%" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="id" width="140"></el-table-column>
			<el-table-column prop="name" label="姓名" width="80"></el-table-column>
      <el-table-column prop="username" label="用户名" width="100"></el-table-column>
			<el-table-column prop="phone" label="手机号" width="120"></el-table-column>
      <el-table-column prop="status" label="状态" width="60"></el-table-column>
			<el-table-column prop="school" label="学校" width="120"></el-table-column>
			<el-table-column prop="department" label="学院"></el-table-column>			
			<el-table-column prop="major" label="专业" width="120"></el-table-column>
			<el-table-column prop="gender" label="性别" width="80"></el-table-column>
			<el-table-column prop="age" label="年龄" width="80"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button
						size="mini"
						@click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button
						size="mini"
						type="danger"
						@click.native.prevent="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
    </el-table>
		<el-dialog title="修改成员信息" :visible.sync="dialogFormVisible">
			<el-form :model="editForm">
				<el-form-item label="id" :label-width="formLabelWidth">
					<el-input v-model="editForm.id" autocomplete="off" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="姓名" :label-width="formLabelWidth">
					<el-input v-model="editForm.name" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="用户名" :label-width="formLabelWidth">
					<el-input v-model="editForm.username"></el-input>
				</el-form-item>
				<el-form-item label="手机号" :label-width="formLabelWidth">
					<el-input v-model="editForm.phone"></el-input>
				</el-form-item>
				<el-form-item label="状态" :label-width="formLabelWidth">
					<el-select v-model="editForm.status" clearable placeholder="请选择">
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
				</el-select>
				</el-form-item>
				<el-form-item label="学校" :label-width="formLabelWidth">
					<el-input v-model="editForm.school"></el-input>
				</el-form-item>
				<el-form-item label="学院" :label-width="formLabelWidth">
					<el-input v-model="editForm.department"></el-input>
				</el-form-item>
				<el-form-item label="专业" :label-width="formLabelWidth">
					<el-input v-model="editForm.major"></el-input>
				</el-form-item>
				<el-form-item label="性别" :label-width="formLabelWidth">
					<el-radio v-model="editForm.gender" label="男">男</el-radio>
					<el-radio v-model="editForm.gender" label="女">女</el-radio>
				</el-form-item>
				<el-form-item label="年龄" :label-width="formLabelWidth">
					<el-input v-model="editForm.age"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="onEdit">确 定</el-button>
			</div>
		</el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
export default {
	name: "MemberList",
	data () {
		return {
			dialogFormVisible: false,
			editForm: {
				id: '',
				name: '',
				username: '',
				phone: '',
				status: '',
				school: '',
				department: '',
				major: '',
				gender: '',
				age: ''
			},
			formLabelWidth: '120px',
			search_input: '',
			select: '',
			tableData: [{
				id: '',
				name: '',
				username: '',
				phone: '',
				status: '',
				school: '',
				department: '',
				major: '',
				gender: '',
				age: ''
			}],
			multipleSelection: [],
			options: [{
				value: '0',
				label: '0-正常'
			}, {
				value: '1',
				label: '1-删除'
			}, {
				value: '2',
				label: '2-审核中'
			}],
			status: '',
			selected: ''
		}
	},
	methods: {
		onEdit: function(){
			let club = sessionStorage.getItem('club')
			club = JSON.parse(club)
			let token = club['token']
			console.log(this.editForm.status)
			let updateInfo = axios.create()
			updateInfo.post(this.$global.PHP_HOST + '/club/updatemember',{
				'id': this.editForm.id,
				'name': this.editForm.name,
				'username': this.editForm.username,
				'phone': this.editForm.phone,
				'status': this.editForm.status,
				'school': this.editForm.school,
				'department': this.editForm.department,
				'major': this.editForm.major,
				'gender': this.editForm.gender,
				'age': this.editForm.age
			},{
				headers: {
					'token': token
				}
			}).then(res=>{
				let result = res['data']['data']
				console.log(result)
				this.editForm = result
				this.tableData[this.selected] = result
				alert(res['data']['message'])
				this.dialogFormVisible = false
			}).catch(error=>{
				console.log(error.response)
			})
		},
		handleEdit(index, row) {
			console.log(index, row);
			this.dialogFormVisible = true
			this.editForm = row
			this.selected = index
		},
		handleDelete(index, row) {
			console.log(index, row['id']);
			this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let deleteMember = axios.create()
				let club = sessionStorage.getItem('club')
				club = JSON.parse(club)
				let token = club['token']
				deleteMember.post(this.$global.PHP_HOST+'/club/deletemember',{
					'id': row['id']
				},{
					headers: {
						'token': token
					}
				}).then(res=>{
					console.log(res)
				}).catch(error=>{
					console.log(error.response)
				})
				this.tableData.splice(index,1)
				this.$message({
					type: 'success',
					message: '删除成功!'
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				})         
			})
		},
		toggleSelection(rows) {
			if (rows) {
				rows.forEach(row => {
					this.$refs.multipleTable.toggleRowSelection(row);
				});
			} else {
				this.$refs.multipleTable.clearSelection();
			}
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		onSearch: function(){
			let searchByName = axios.create()
			let club = sessionStorage.getItem('club')
			club = JSON.parse(club)
			let token = club['token']
			searchByName.post(this.$global.PHP_HOST+'/club/getbycondition',{
				'flag': this.select,
				'condition': this.search_input
			},{
				headers: {
					'token': token
				}
			}).then(res=>{
				this.tableData = Object.entries(res['data']['data'])
				for (let index = 0; index < this.tableData.length; index++) {
					this.tableData[index] = this.tableData[index][1];
				}
			}).catch(error=>{
				console.log(error.response)
				alert(error.response['data']['message'])
			})
		}
	},
	created () {
		let getList = axios.create()
		let club = sessionStorage.getItem('club')
		club = JSON.parse(club)
		let token = club['token']
		getList.post(this.$global.PHP_HOST + '/club/getmemberlist',{
			data: ''
		},{
			headers: {
				'token': token
			}
		}).then(res=>{
			console.log(res)
			this.tableData = Object.entries(res['data']['data'])
			for (let index = 0; index < this.tableData.length; index++) {
				this.tableData[index] = this.tableData[index][1];
			}
		}).catch(error=>{
			console.log(error)
		})
	}
}
</script>
<style>
.form-header{
	width:80%;
	margin: auto;
	margin-top: 20px;
	margin-bottom: 20px;
}
.el-select .el-input {
	width: 144px;
}
.input-with-select .el-input-group__prepend {
	background-color: #fff;
}
</style>