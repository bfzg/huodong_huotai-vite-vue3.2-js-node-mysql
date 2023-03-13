<template>
  <div class='comments'>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>评论管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card>
      <!-- 搜索框 -->
      <el-row :gutter="25">
        <el-col :span="7">
          <!-- 搜索框 -->
          <el-input v-model="requestParams.query" placeholder="请输入发布人姓名" class="input-with-select">
            <template #append>
              <el-button @click="queryBtn" :icon="Search" />
            </template>
          </el-input>
        </el-col>
        <el-col :span="10">
          <el-button @click="open" v-if="deleteBtnShow" type="danger" :icon="Delete" circle />
        </el-col>
      </el-row>
      <!-- 表格区 -->
      <el-table @select="selectItme" @select-all="selectAll" :data="dataList" style="width: 100%" row-key="id"
        :stripe="true" border lazy :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="uname" label="发布者姓名" width="100"/>
        <el-table-column prop="comment" label="评论内容" />
        <el-table-column label="图片">
          <template #default="scope">
           <div class="img_box">
            <el-image  v-for="(item,index) in scope.row.img" :key="index" style="width: 100px; height: 100px" :src="item" fit="contain" />
          </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区 -->
      <el-pagination @current-change="handleSizeChange" background :current-page="requestParams.pageNum"
        :page-size="requestParams.pageSize" :total="total" layout="prev, pager, next" />
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, watch } from 'vue'
import { Search, Delete } from '@element-plus/icons-vue';
//api
import { getDataList, removeComment } from '@/request/comments/comments.js'

let dataList = ref([]);

let requestParams = reactive({
  //查询参数
  query: '',
  // 当前页数
  pageNum: 1,
  //每页显示的长度
  pageSize: 5
})
//数据总长度
let total = ref(0)

//多选
let checkList = ref([]);
//控制删除按钮的显示与隐藏
let deleteBtnShow = ref(false);

onMounted(() => {
  getCommentsList();
})

/** 请求数据 */
const getCommentsList = async function () {
  let { data: res } = await getDataList(requestParams);
  if (res.status == 200) {
    dataList.value = res.data;
    total.value = Number(res.total);
  }
}

/** 操作按钮 */
//搜索按钮
const queryBtn = function () {
  getCommentsList();
}
//全选按钮
const selectAll = function (row) {
  checkList.value = row
}
//单选按钮
const selectItme = function (row) {
  checkList.value = row
}

//当页数改变时
const handleSizeChange = function (nwePageNum) {
  requestParams.pageNum = nwePageNum;
  getCommentsList();
}

//删除按钮
const open = function () {
  let select = ref([]);
  if (checkList.value) {
    checkList.value.forEach((item) => {
      select.value.push(item.id);
    })
  }
  let strSelect = ref('');
  strSelect.value = select.value + ',';
  console.log(strSelect.value);
  ElMessageBox.confirm(
    '你确定要删除你选中的评论吗?',
    '警告',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      let { data: res } = await removeComment(strSelect.value);
      if (res.status == 200) {
        ElMessage({
          type: 'success',
          message: res.message,
        })
        getCommentsList();
      }

    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '你取消了删除操作',
      })
    })
}

/** 监听多选数据的变化 删除按钮 有值显示 没值隐藏 */
watch(checkList, (now, old) => {
  if (now == '') {
    deleteBtnShow.value = false;
  } else {
    deleteBtnShow.value = true;
  }
})

</script>

<style scoped>
.el-table {
  margin-top: 10px;
}
.img_box{
  width: 100%;
  display: row;
  flex-direction: column;
}
.el-image{
  width: 30%;
  margin: 0 3px;
}
</style>