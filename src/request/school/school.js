import http from '../index';

export function getSchoolData (data){
    return http({
        method:"get",
        url:"/api/school/getEventsList",
        params:{
           data
        }
    })
}

export function removeEvents(id){
    return http({
        method:'delete',
        url:'/api/school/deleteEvents',
        data:{
            id:id
        }
    })
}

export function editEvents(data){
    return http({
        method:'put',
        url:'/api/school/editEvents',
        data:{
            data
        }
    })
}