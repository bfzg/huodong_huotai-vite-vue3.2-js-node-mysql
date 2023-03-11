<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>
            <div>
                <img :size="50" src="../assets/background.jpg" />
                <span>后台管理系统</span>
                <el-button type="info" @click="logout">退出</el-button>
            </div>
        </el-header>
        <el-container>
            <!-- 侧边栏区域 -->
            <el-aside width="200px">
                <!-- <div class="toggle-button" @click="toggle-button">|||</div> -->
                <el-menu class="el-menu-vertical-demo" default-active="2" background-color="#333744" text-color="#fff"
                    active-text-color="#409bff" @open="handleOpen" @close="handleClose">
                    <!-- 一级菜单 -->
                    <el-menu-item @click="saveNavState(item.path)" :index="item.path" v-for="(item,index) in newMenus" :key="index">
                        <i class="iconfont icon-yonghuguanli_huaban"></i>
                        <span>{{item.name}}</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <!-- 主体区域 -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>    

<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted,watch } from "vue";
//pinia
import userStore from "../store/user";
import menus from "../config/menus";

const router = useRouter();

/** 生成菜单 */
let newMenus = ref([]);
let user_store = userStore();

onMounted(() => {
    const menuKeys = user_store.view_list;
    menus.forEach((item) => {
        if (item.key && menuKeys.includes(item.key)) {
            newMenus.value.push(item);
        }
    })
})

/** 点击菜单 */
const saveNavState = function(path){
    window.sessionStorage.setItem("activePath",path)
    router.push(path);
}

/** 退出登录*/
const logout = function () {
    window.sessionStorage.clear();//清除所有会话存储
    router.push("/login");
}

</script>

<style lang="less" scoped>
.home-container {
    height: 100%;
}

.el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #ffffff;

    div {
        display: flex;
        align-items: center;

        .el-button {
            position: fixed;
            right: 20px;
        }

        span {
            margin-left: 20px;
        }

        img {
            width: 90px;
        }
    }
}
.el-menu{
    height: 100%;
}
</style>