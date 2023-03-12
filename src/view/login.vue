<template>
    <div class='login'>
        <!-- 图片区域 -->
        <div class="login_box">
            <div style="width: 500px; height: 120px;">
                <div class="img_box">
                    <el-avatar :size="120" src="https://images.alphacoders.com/130/thumbbig-1301788.jpg" />
                </div>
            </div>
            <!-- form表单 -->
            <div class="from_box">
                <el-form :model="form">
                    <el-form-item>
                        <el-input v-model="form.username" class="w-50 m-2" size="large" placeholder="请输入账号"
                            :prefix-icon="UserFilled" />
                    </el-form-item>
                    <el-form-item>
                        <el-input show-password v-model="form.password" class="w-50 m-2" size="large" placeholder="请输入密码"
                            :prefix-icon="Key" />
                    </el-form-item>
                </el-form>
                <div class="btn">
                    <el-button @click="postUserInfo" type="primary">登录</el-button>
                    <el-button type="info">重置</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { UserFilled, Key } from '@element-plus/icons-vue'
//api
import { postUserLogin } from '@/request/login/login.js'
//pinia
import userStore from '../store/user';
//router
import { useRouter } from 'vue-router';


let router = useRouter();
const user_store = userStore();

//账号及密码
let form = reactive({
    username: '',
    password: '',
})

/** 登录功能*/
const postUserInfo = async function () {
    let { data: res } = await postUserLogin(form);
    if (res.status !== 200) {
        return ElMessage.error(res.message);
    } else {
        console.log(res);
        user_store.getUserInfoAndToken(res.res_userInfo);
        router.push('/home');
        return ElMessage.success('登录成功!');
    }
}


</script>

<style lang="less" scoped>
.login {
    width: 100vw;
    height: 100vh;
    background: url('../assets/background.jpg');
    background-size: cover;
    margin: 0;
    padding: 0;
}

.login_box {
    width: 450px;
    height: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    background-color: #fff;

    .img_box {
        width: 120px;
        height: 120px;
        position: absolute;
        top: -60px;
        left: 50%;
        transform: translate(-50%, 0);

        .el-button {
            text-align: center;
        }
    }
}

.from_box {
    padding: 0 10px;

    .el-form-item {
        margin: 0 0 20px 0;
    }

}

.btn {
    text-align: center;

    .el-button {
        margin: 0 15px;
        width: 70px;
        height: 35px;
    }
}</style>