<template>
    <div id="activity_info_bg">    <!--背景图层面板-->
        <div class="top_nav">  <!--顶部导航栏-->
            <div class="home-logo">
                <a target="_blank" href="">
                    <img class="homepage-logo" src="/img/logo.png" width="40px" height="30px">
                </a>
                <a target="_blank" href="">
                    甲鱼社团首页
                </a>
            </div>
            <div class="quick-nav">
                <a class="navItem" href="">个人中心</a>
                <a class="navItem" href="">个人中心</a>
                <a class="navItem" href="">个人中心</a>
                <a class="navItem" href="">个人中心</a>
            </div>
       </div>
       <div class="theTitle">
            <p class="titleInfo">
                {{act_name}}
            </p>
       </div>
       <div class="theInfo">
                {{act_info}}
       </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'activity_info',
    data() {
        return {
            act_name: '',
            act_info:'',
            a_id:''
        }
    },
    created(){
        console.log('接受参数')
        this.a_id = this.$route.params.act_id
        console.log(this.a_id)
        let getAct = axios.create()
        let person = localStorage.getItem('person')
        person = JSON.parse(person)
        getAct.get(this.$global.PHP_HOST + '/person/getAct',{
            params: {
                'act_id': this.a_id
            },
            headers:{
                'token':person['token']
            }
        }).then(res=>{
            console.log(res)
            let result = res['data']['data']
            this.act_name=result['name']
            this.act_info=result['act_info']
        }).catch(error=>{
            console.log(error.respond)
        })
    }
}
</script>

<style>
    #activity_info_bg{
        width: 100%;
        height: 1000px;
        background-color: #ddd;
        overflow: hidden;
    }
</style>
