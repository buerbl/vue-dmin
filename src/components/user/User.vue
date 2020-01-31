<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 搜索 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 表格 -->
      <el-table border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop></el-table-column>
        <el-table-column label="姓名" prop></el-table-column>
        <el-table-column label="姓名" prop></el-table-column>
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
        pagesize: 2,
      },
    };
  },

  methods: {

    handleSizeChange() {

    },

    handleCurrentChange() {

    },
  },


};
</script>
<style lang="less" scoped>
</style>
