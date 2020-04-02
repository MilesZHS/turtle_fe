<template>
    <div id="club_info_bg">    <!--背景图层面板-->
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
                        {{club_name}}
                    </p>
            </div>
            <div class="theInfo">
                <div class="info_intro">    <!--左边的社团简介-->
                        {{club_info}}
                </div>
                <div class="info_details">  <!--右边的详细信息-->
                    <div id="avatar">
                        <!-- <img :src="avatarURL" alt="社团标志"> -->
                    </div>
                    <ul>
                        <li>会长：{{club_leader}}</li>
                        <li>学校：{{school}}</li>
                        <li>学院：{{department}}</li>
                        <li>电话：{{phone}}</li>
                        <li>邮箱：{{email}}</li>
                        <li>人数：{{number}}</li>
                    </ul>
                </div>
            </div>
            <div class="recent_act">
                <h2>近期活动</h2>
            </div>
            <div class="engage">
                <!-- <button class="engage_button" @click="engage">报名加入</button> -->
            </div>
    </div>
    

</template>

<script>
import axios from 'axios'
export default {
    name:'Club_info',
    data() {
        return {
            club_name: '',
            club_info:'',
            club_details:'',
            c_id: '',
            club_leader:'',
            school:'',
            department:'',
            phone:'',
            email:'',
            number:'',
            actInfo: [{
                id: '',
                name: '飞手第一次培训',
                area:'无人机协会内',
                time:'2019-12-04 09：12',
                num: '10',
                price:'0',
                logo_path: 'http://q0mybgzn5.bkt.clouddn.com/15dcabaf4096011573901207623'
      }],
        }
    },
    created(){
        console.log('接受参数')
        this.c_id = this.$route.params.c_id
        console.log(this.c_id)
        let getClub = axios.create()
        // let getActList=axios.create()
        let person = localStorage.getItem('person')
        person = JSON.parse(person)
        getClub.get(this.$global.PHP_HOST + '/person/getclub',{
            params: {
                'club_id': this.c_id
            },
            headers:{
                'token':person['token']
            }
        }).then(res=>{
            console.log(res)
            let result = res['data']['data']
            this.club_name=result['club_name']
            this.club_info=result['club_info']
            this.club_leader=result['club_leader']
            this.school=result['school']
            this.department=result['department']
            this.phone=result['phone']
            this.email=result['email']
            this.number=result['number']
        }).catch(error=>{
            console.log(error.response)
        })
        // getActList.get(this.$global.PHP_HOST + '/person/getActList',{
        //     params:{
        //         'club_id':this.c_id
        //     },
        //     headers:{
        //         'token':person['token']
        //     }
        //  }).then(res=>{
        // this.banners = res['data']['data']['banner']
        // this.actInfo = Object.entries(res['data']['data']['info'])	
        //         for (let index = 0; index < this.actInfo.length; index++) {
        //       this.actInfo[index] = this.actInfo[index][1];
        //       this.actInfo[index].logo_path = this.actInfo[index]['photo_path'][0]
        // }
        // }).catch(err=>{
        // console.log(err.response)
        // })
        
    }
}
</script>

<style>
    #club_info_bg{
        width: 100%;
        height: 2000px;
        background-color: #eee;
        overflow: hidden;
    }
    .top_nav{
        width: 100%;
        height: 60px;
        background-color:white;
        text-decoration: none;
        font-size: 20px;
        line-height: 40px;
    }
    .home-logo{
        display: inline-block;
        width: 400px;
    }
    .home-logo img{
        margin-top: 10px;
    }
    .home-logo a{
        margin-left:20px;
        font-size: 20px;
        vertical-align: middle;
        color: #37baa0;
        text-decoration: none;
    }
    .quick-nav{
        float: right;
        width: 400px;
        margin-top: 10px;
        font-size: 15px;
    }
    .quick-nav a{
        text-decoration: none;
        color: #37baa0;
    }
    .theTitle{
        margin:50px 0;
        height: 80px;
        width: 100%;
        background-color:white; 
        text-align: center;
        vertical-align: middle;
        font-size: 45px;
        line-height: 80px;
    }
    .theInfo{
        width: 80%;
        height: 300px;
        margin: auto;
        padding: 20px 0;
        background-color:white; 
        border-radius: 3%;
        box-shadow: 5px 5px 10px #999;
    }
    .info_intro{
        width: 60%;
        height: 100%;
        padding-right: 20px;
        border-right: #aaa solid 1px;
        display: inline-block;
        background-color: white;
        text-indent: 50px;
        word-break: break-all;
        vertical-align:top;
    }
    .info_details{
        width: 30%;
        height: 100%;
        display: inline-block;
        background-color: white;
        word-break: break-all;
        
    }
    .info_details ul li{
        list-style: none;
    }
    .engage{
        background-color: #eee;
        width: 100%;
        height: 60px;
        bottom: 0;
        right: 0;
        position:fixed;
        
    }
    .engage_button{
        width: 200px;
        line-height: 60px;
        color:white;
        float: right;
        background-color: #37baa0;
        font-size: 30px;
        border-radius: 10%;
    }
    .recent_act{
        width: 80%;
        height: 300px;
        margin: auto;
        margin-top: 100px;
        padding: 20px 0;
        background-color:white; 
        border-radius: 3%;
        box-shadow: 5px 5px 10px #999;
        text-indent: 50px;
    }
</style>