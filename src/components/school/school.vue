<template>
  <div class='school'>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学校活动管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card>
      <!-- 搜索框 -->
      <el-row :gutter="25">
        <el-col :span="7">
          <!-- 搜索框 -->
          <el-input v-model="requestParams.query" placeholder="请输入活动名称" class="input-with-select">
            <template #append>
              <el-button @click="queryBtn" :icon="Search" />
            </template>
          </el-input>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table :data="dataList" :border="true" stripe style="width: 100%">
        <el-table-column prop="eventsname" label="活动名称" width="150" />
        <el-table-column prop="uname" label="姓名" width="120" />
        <el-table-column prop="email" label="邮箱" width="190" />
        <el-table-column prop="starttime" label="开始时间" width="180" />
        <el-table-column prop="shuttime" label="结束时间" width="180" />
        <el-table-column prop="address" label="地址" width="100" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">Edit</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @current-change="handleSizeChange" :current-page="requestParams.pageNum"
        :page-size="requestParams.pageSize" background layout="prev, pager, next" :total="total" />
    </el-card>
    <!-- 编辑活动对话框 -->
    <el-dialog v-model="dialogVisible" title="编辑活动" width="50%" :before-close="handleClose" :show-close="false">
      <el-form ref="formTable" :rules="rules" :model="newEventsValue" label-width="100px" label-position="left">
        <el-form-item label="用户名">
          <el-input v-model="newEventsValue.uname" prop="eventsname" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="newEventsValue.uemail" prop="uemail" />
        </el-form-item>
        <el-form-item label="开始时间" prop="startdate">
          <el-date-picker v-model="newEventsValue.starttime" type="date" placeholder="Pick a date" style="width: 100%"
            format="YYYY/MM/DD" value-format="YYYY-MM-DD" />
        </el-form-item>
        <el-form-item label="结束时间" prop="shutdate">
          <el-date-picker v-model="newEventsValue.shuttime" type="date" placeholder="Pick a date" style="width: 100%"
            format="YYYY/MM/DD" value-format="YYYY-MM-DD" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="newEventsValue.address" />
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
import { reactive, ref, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue';
//api
import { getSchoolData, removeEvents, editEvents } from '@/request/school/school.js'

//数据
let dataList = ref([]);
//搜索及分页
let requestParams = reactive({
  query: '',
  //当前页数
  pageNum: 1,
  //每页显示多少条数据
  pageSize: 5
})
//总条目数
let total = ref(0)
//新活动内容
let newEventsValue = reactive({
  id: null,
  eventsname: '',
  uname: '',
  uemail: '',
  starttime: '',
  shuttime: '',
  address: ''
})
//控制编辑对话框的显示与隐藏
let dialogVisible = ref(false);
//表单实例
let formTable = ref(null);
//表单验证
const rules = reactive({
  eventsname: [
    { required: true, message: '请输入活动名称', trigger: 'blur' },
  ],
  uemail: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
  ],
  address: [
    { required: true, message: '请输入内容', trigger: 'blur' },
  ],
})

onMounted(() => {
  getDataList();
})

/** 请求数据 */
const getDataList = async function () {
  let { data: res } = await getSchoolData(requestParams);
  if (res.status == 200) {
    dataList.value = res.data
    total.value = Number(res.total)
  }
}

/** 操作按钮 */
//搜索按钮
const queryBtn = function () {
  getDataList();
}
//编辑按钮
const handleEdit = function (data) {
  dialogVisible.value = true;
  newEventsValue.eventsname = data.eventsname;
  newEventsValue.uname = data.uname;
  newEventsValue.uemail = data.email;
  newEventsValue.starttime = data.starttime;
  newEventsValue.shuttime = data.shuttime;
  newEventsValue.address = data.address;
  newEventsValue.id = data.id;
}

//确定修改按钮
const pushNewUserInfo = async function () {
  await formTable.value.validate(async (valid, fields) => {
    if (valid) {
      let { data: res } = await editEvents(newEventsValue);
      if (res.status == 200) {
        ElMessage.success(res.message);
        dialogVisible.value = false;
        getDataList();
      } else {
        ElMessage.error('修改失败!');
      }
    } else {
      ElMessage.error('请补全表单!');
    }
  })


}

//删除按钮
const handleDelete = async function (data) {
  let { data: res } = await removeEvents(data.id);
  if (res.status == 200) {
    ElMessage.success(res.message);
    getDataList();
    return;
  }
}
/** 分页功能 */
const handleSizeChange = function (nwePageNum) {
  requestParams.pageNum = nwePageNum;
  getDataList();
}
</script>

<style scoped>
.el-table {
  margin-top: 10px;
}
</style>