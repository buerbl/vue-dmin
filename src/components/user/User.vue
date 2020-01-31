<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card >
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="4">
            <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
</style>
