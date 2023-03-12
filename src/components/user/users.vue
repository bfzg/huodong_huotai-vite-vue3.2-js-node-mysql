<template>
  <div class='users'>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card class="box-card">
      <el-row :gutter="25">
        <el-col :span="7">
          <!-- 搜索框 -->
          <el-input v-model="queryParams.query" placeholder="请输入内容" class="input-with-select">
            <template #append>
              <el-button @click="queryBtn" :icon="Search" />
            </template>
          </el-input>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table :border="true" :data="dataList" stripe style="width: 100%">
        <el-table-column prop="utime" label="创建日期" width="220" />
        <el-table-column prop="uname" label="用户名" width="150" />
        <el-table-column prop="uemail" label="用户邮箱" width="250" />
        <el-table-column prop="uip" label="ip地址" width="200" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">Edit</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row.uid)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @current-change="handleSizeChange" :current-page="queryParams.pageNum" background
        layout="prev, pager, next" :total="totals" :page-size="queryParams.pageSize" />
    </el-card>

    <!-- 编辑用户对话框 -->
    <el-dialog v-model="dialogVisible" title="编辑用户" width="40%" :before-close="handleClose" :show-close="false">
      <el-form :model="newUserInfo" label-width="100px"  label-position="left">
        <el-form-item label="用户名">
          <el-input v-model="newUserInfo.uname" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="newUserInfo.uemail" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="pushNewUserInfo">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { Search} from '@element-plus/icons-vue';
import { ref, onMounted, reactive } from 'vue';
//api
import { getUserList, removeUser,editUserInfo} from "@/request/userManage/users.js";

let dataList = ref([]);


//查询参数
let queryParams = reactive({
  //搜索
  query: '',
  //当前页数
  pageNum: 1,
  //每页显示多少条数据
  pageSize: 5
})

//分页长度
let totals = ref(0);
//控制编辑对话框的显示与隐藏
let dialogVisible = ref(false);

onMounted(() => {
  getUserListApi();  //获取数据
});

/** 获取用户列表 */
const getUserListApi = async function () {
  let { data: res } = await getUserList(queryParams);
  dataList.value = res.data;
  totals.value = Number(res.total);
}

/**分页*/
//当每页显示多少条数据时触发
const handleSizeChange = function (nwepageNum) {
  queryParams.pageNum = nwepageNum;
  getUserListApi();
}

const queryBtn = function () {
  getUserListApi();
}

/** 操作按钮 */
//删除按钮
const handleDelete = async function (uid) {
  let { data: res } = await removeUser(uid);
  if (res.status == 200) {
    ElMessage.success(res.message);
    getUserListApi();
    return;
  }
}
//编辑按钮
let uid = ref('');
const handleEdit = function (data) {
  dialogVisible.value = true;
  newUserInfo.uname=data.uname;
  newUserInfo.uemail=data.uemail;
  uid.value = data.uid;
}


/** 编辑用户对话框 */
let newUserInfo = reactive({
  uname:'',
  uemail:''
});

//对话框 确定按钮 提交新的用户信息
const pushNewUserInfo = async function(){
  let {data:res} = await editUserInfo(newUserInfo,uid.value);
  if(res.status == 200){
    ElMessage.success(res.message);
    getUserListApi();
    dialogVisible.value=false;
    return;
  }
}

//对话框关闭之前的钩子
const handleClose = function(){
  newUserInfo.uname='';
  newUserInfo.uemail='';
}

</script>

<style scoped>
.el-table {
  margin-top: 10px;
}
</style>