<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容">
          </el-input>
        </el-col>
        <el-button type="primary" @click="click1">搜索角色</el-button>
        <el-button type="primary" v-has="role-add">添加角色</el-button>
      </el-row>

      <!-- 表格 -->
      <el-table border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop></el-table-column>
        <el-table-column label="角色名称" prop></el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        pagenum: 1,
        pagesize: 2
      }
    };
  },

  methods: {
    handleSizeChange() {},

    handleCurrentChange() {}
  }
};
</script>

<style lang="less" scoped>
</style>
