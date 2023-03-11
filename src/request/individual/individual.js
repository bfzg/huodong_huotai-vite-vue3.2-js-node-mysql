import http from "../index";

//获取数据列表
export function getIndividualList(){
    return http({
        method:'get',
        url:'/api/individual/getList'
    })
}

//删除活动
export function removeEvents(id){
    return http({
        method:'delete',
        url:'/api/individual/deleteEvents',
        data:{
            id:id
        }
    })
}