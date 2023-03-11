import axios from "axios";

let service = axios.create({
    baseURL: "http://127.0.0.1:3333/",
    timeout: 3000,
})


//axios 请求拦截器
service.interceptors.request.use((config) => {
    let userToken = window.sessionStorage.getItem('token');
    if (!userToken){
        return config;
    }else{
        config.headers.Authorization = userToken.token;
        return config;
    }  
});

//配置相应拦截器


export default service;