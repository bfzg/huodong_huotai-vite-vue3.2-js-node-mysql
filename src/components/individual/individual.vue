<template>
  <div class='individual'>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <el-table :data="dataList" :border="true" stripe style="width: 100%">
        <el-table-column prop="eventsname" label="活动名称" width="150" />
        <el-table-column prop="uname" label="姓名" width="120" />
        <el-table-column prop="email" label="邮箱" width="190" />
        <el-table-column prop="starttime" label="开始时间" width="180" />
        <el-table-column prop="shuttime" label="结束时间" width="180" />
        <el-table-column prop="address" label="地址" width="100"/>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">Edit</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { onMounted,ref } from 'vue';
//api
import {getIndividualList,removeEvents} from '@/request/individual/individual.js'

let dataList = ref([]);

onMounted(async ()=>{
  let {data:res} = await getIndividualList();
  if(res.status == 200){
    dataList.value = res.data;
    return;
  }
})

/** 操作功能 */
//删除按钮
const handleDelete = async function(data){
  console.log(data.id);
  let res = await removeEvents();
  console.log(res);
}
//TODO 使用 api删除数据  设置分页功能 比较麻烦 搜一下

</script>

<style scoped></style>