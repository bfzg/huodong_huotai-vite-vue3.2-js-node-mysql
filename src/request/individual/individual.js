import http from "../index";

//获取数据列表
export function getIndividualList(data){
    return http({
        method:'get',
        url:'/api/individual/getList',
        params:{
            data
        }
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

//修改活动
export function editEvents(data){
    return http({
        method:'put',
        url:'/api/individual/editEvents',
        data:{
            data
        }
    })
}