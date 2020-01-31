<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加权限</el-button>
        </el-col>
      </el-row>

      <!-- 表格 -->
      <el-table border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop></el-table-column>
        <el-table-column label="姓名" prop></el-table-column>
        <el-table-column label="姓名" prop></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
</style>
