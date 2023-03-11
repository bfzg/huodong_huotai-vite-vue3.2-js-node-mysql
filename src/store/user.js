import { defineStore } from "pinia";
const userStore = defineStore('useStore',{
    state:()=>{
        return{
           userInfo:{
            id:'',
            userName:'',
            grade:''
           },
           view_list:[],
           token:'',
           //动态路由
           motionRouter:[],
        }   
    },
    actions:{
        //登录后获取用户信息及token 持久化存储
        getUserInfoAndToken(data){
            this.userInfo.id=data.id;
            this.userInfo.userName=data.name;
            this.userInfo.grade=data.grade;
            this.view_list=data.view_list;
            this.token=data.token;
            return;
        },
        //存入动态路由
        saveMotionRouter(data){
            this.motionRouter = data;
            console.log(this.motionRouter);
            return;
        }
        
    },
    // 持久化存储配置
    persist:{
        enabled:true,   //开启缓存 默认会存储在本地 localstorage
        strategies: [{
            key: "token",
            storage:sessionStorage,
            path:["token"]
        }]
        
    }
})  

export default userStore;