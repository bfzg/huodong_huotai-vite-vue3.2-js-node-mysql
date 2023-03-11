import http from '../index.js';

export function postUserLogin(data){
    return http({
        method:'post',
        url:'/login',
        data
    })
}