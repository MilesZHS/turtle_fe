<template>
	<div id="list">
		<div class="form-header">			
			<div style="width: 80%;float:left;">
				<el-input placeholder="请输入内容" v-model="search_input" class="input-with-select">
					<el-select v-model="select" slot="prepend" placeholder="请选择查询条件">
						<el-option label="设备编号" value="1"></el-option>
						<el-option label="设备名称" value="2"></el-option>
						<el-option label="管理员" value="3"></el-option>
						<el-option label="状态" value="4"></el-option>
						<el-option label="所有设备" value="5"></el-option>
					</el-select>
					<el-button slot="append" @click="onSearch" icon="el-icon-search"></el-button>
				</el-input>
			</div>
			<el-button @click="toggleSelection()">取消选择</el-button>
			<!-- <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
		</div>
		<el-table
			ref="multipleTable"
			:data="tableData"
			stripe
			tooltip-effect="dark"
			style="width: 100%"
			@selection-change="handleSelectionChange">
			<el-table-column
				type="selection"
				width="55">
			</el-table-column>
			<el-table-column
				prop="id"
				label="设备编号"
				width="180">
			</el-table-column>
			<el-table-column
				prop="name"
				label="设备名称"
				width="180">
			</el-table-column>
			<el-table-column
				prop="num"
				label="设备数量">
			</el-table-column>
			<el-table-column
				prop="create_time"
				label="登记时间">
			</el-table-column>
			<el-table-column
				prop="price"
				label="设备价值">
			</el-table-column>
			<el-table-column
				prop="administrator"
				label="管理员">
			</el-table-column>
			<el-table-column
				prop="status"
				label="状态">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button
						size="mini"
						@click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button
						size="mini"
						type="danger"
						@click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="修改设备信息" :visible.sync="dialogFormVisible">
			<el-form :model="form">
				<el-form-item label="id" :label-width="formLabelWidth">
					<el-input :disabled="true" v-model="form.id"></el-input>
				</el-form-item>
				<el-form-item label="设备名称" :label-width="formLabelWidth">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="设备数量" :label-width="formLabelWidth">
					<el-input v-model="form.num"></el-input>
				</el-form-item>
				<el-form-item label="登记时间" :label-width="formLabelWidth">
					<el-input v-model="form.create_time" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="设备价值" :label-width="formLabelWidth">
					<el-input v-model="form.price"></el-input>
				</el-form-item>
				<el-form-item label="管理员" :label-width="formLabelWidth">
					<el-input v-model="form.administrator"></el-input>
				</el-form-item>
				<el-form-item label="设备状态" :label-width="formLabelWidth">
					<el-select v-model="form.status" clearable placeholder="请选择">
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
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
	name: 'EquiList',
	data () {
		return {
			dialogFormVisible: false,
			form: {
				id: '',
				name: '',
				num: '',
				create_time: '',
				price: '',
				administrator: '',
				status: ''
			},
			options: [{
				value: '0',
				label: '0-库存'
			},{
				value: '1',
				label: '1-借出'
			},{
				value: '2',
				label: '2-损坏'
			},{
				value: '3',
				label: '3-丢失'
			}],
			formLabelWidth: '80px',
			search_input: '',
			select: '',
			tableData: [{
				id: '',
				name: '',
				num: '',
				create_time: '',
				price: '',
				administrator: '',
				status: ''
			}],
			multipleSelection: [],
			select_index: ''
		}
	},
	methods: {
		handleEdit(index) {
			this.dialogFormVisible = true
			this.select_index = index
			this.form = this.tableData[index]
		},
		onEdit(){
			let club = sessionStorage.getItem('club')
			club = JSON.parse(club)
			let token = club['token']
			let updateEqui = axios.create()
			updateEqui.post(this.$global.PHP_HOST+'/club/updateequi',{
				'id': this.form.id,
				'name': this.form.name,
				'num': this.form.num,
				'price': this.form.price,
				'administrator': this.form.administrator,
				'status': this.form.status
			},{
				headers: {
					'token': token
				}
			}).then(res=>{
				if(res['data']['message'] == '更新成功'){
					alert(res['data']['message'])
					this.tableData[this.select_index] = res['data']['data']
					this.dialogFormVisible = false
				}else{
					alert(res['data']['message'])
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		handleDelete(index, row) {
			console.log(index, row['id']);
			this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let deleteEqui = axios.create()
				let club = sessionStorage.getItem('club')
				club = JSON.parse(club)
				let token = club['token']
				deleteEqui.post(this.$global.PHP_HOST+'/club/deleteequi',{
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
		onSearch(){
			let getByConf = axios.create()
			let club = sessionStorage.getItem('club')
			club = JSON.parse(club)
			let token = club['token']
			getByConf.post(this.$global.PHP_HOST+'/club/getequibycondition',{
				'flag': this.select,
				'condition': this.search_input,
				'c_id': club['id']
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
		let getTable = axios.create()
		let club = sessionStorage.getItem('club')
		club = JSON.parse(club)
		let c_id = club['id']
		getTable.get(this.$global.PHP_HOST + '/club/getequilist',{
			params:{
				'c_id': c_id 
			},
			headers: {
				'token': club['token']
			}
		}).then(res=>{
			res = res['data']['data']
			this.tableData = Object.entries(res)	
			for (let index = 0; index < this.tableData.length; index++) {
				this.tableData[index] = this.tableData[index][1];
			}
		}).catch(err=>{
			console.log(err.response)
		})
	}
}
</script>
<style>

</style>