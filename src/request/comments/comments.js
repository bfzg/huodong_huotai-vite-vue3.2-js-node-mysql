import http from '../index';

//请求数据
export function getDataList (data){
    return http({
        method:'get',
        url:'/api/comments/getDataList',
        params:{
            data
        }
    })
}

//删除数据
export function removeComment(data){
    return http({
        method:'delete',
        url:'/api/comments/removeComment',
        data:{
            data
        }
    })
}