<script setup>
import { useRouter } from 'vue-router';
let router = useRouter();
let info = JSON.parse(window.sessionStorage.getItem('token'));
if(info != null){
  router.push('/home')
}
//TODO动态路由解决方案 每次刷新都返回首页
</script>

<template>
    <router-view/>
</template>

<style scoped>

</style>
