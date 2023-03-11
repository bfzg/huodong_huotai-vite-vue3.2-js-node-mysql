import http from "../index";

//获取用户列表
export function getUserList(data){
    return http({
        method:"get",
        url:"/api/user/getUserInfo",
        params:{
           data
        }
    })
}

//删除用户列表
export function removeUser(id){
    return http({
        method:"delete",
        url:'/api/user/deleteUser',
        data:{
            uid:id
        }
    })
}

//编辑用户信息
export function editUserInfo(userInfo,id){
    return http({
        method:'put',
        url:'/api/user/editUser',
        data:{
            uname:userInfo.uname,
            uemail:userInfo.uemail,
            uid:id
        }
    })
}