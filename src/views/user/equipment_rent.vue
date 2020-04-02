<template>
    <div id="equipment_rent" :style="{height:windowHeight + 'px'}">    <!--背景图层面板-->
        <div id="rent_main">  <!--主体白框-->
            <div class="main_form" ref="main_form" :inline="true"> <!--主体表单-->
                <b style="font-size:30px">设备租用</b>
                <el-form id="rent_form" ref="rent_form" :model="equipment_rent" label-width="80px">
                    <el-form-item label="租借单位">
                        <el-input v-model="equipment_rent.user"></el-input>
                    </el-form-item>
                    <el-form-item label="设备">
                        <el-select v-model="equipment_rent.item" placeholder="请选择租用的设备">
                        <el-option label="无人机" value="无人机"></el-option>
                        <el-option label="摄像机" value="摄像机"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="租借日期">
                        <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="equipment_rent.date" style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="使用时长" size="small">
                        <el-input v-model="equipment_rent.usetime"></el-input>
                    </el-form-item>
                    <el-form-item label="备注信息" size="large">
                        <el-input v-model="equipment_rent.info"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit" size="large">租用！</el-button>   
                    </el-form-item>
                    <el-form-item>
                        <el-button>返回</el-button> 
                    </el-form-item>
                </el-form>
            </div> 
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Equipment_rent',
    data() {
      return {
        equipment_rent: {
            user:'',
            item:'',
            data:'',
            usetime:'',
            info:'',
        },
        windowHeight: '',
      }
    },
    created(){
        this.windowHeight = window.innerHeight
        console.log(this.windowHeight)
        let getInfo = axios.create()
        let token = sessionStorage.getItem('token')
        getInfo.post('http://localhost:8888/person/getinfo',{
            'data': ''
        },{
            headers: {
                'token': token
            }
        }).then(res=>{
            console.log(res)
            let result = res['data']['data']
            this.person_info.user = result['name']
            this.person_info.item=result['equipment']
            this.person_info.data=result['data']
            this.person_info.usetime=result['usetime']
            this.person_info.info=result['info']

        }).catch(error=>{
            console.log(error.response)
        })
    },
    methods: {
      onSubmit() {
        console.log('submit!')
        alert('submit!')
      },
    }
}
</script>

<style>
    #equipment_rent{
        width: 100%;
        background:url("/img/reg_bg.png") no-repeat center;
        text-align:center;
        overflow: hidden;
    }
    #rent_main{
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