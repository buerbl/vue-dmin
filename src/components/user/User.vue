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
          <el-button type="primary" @click="click1">添加用户</el-button>
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
        authorization: "2",

        pagesize: 2
      }
    };
  },

  methods: {
    handleSizeChange() {},

    handleCurrentChange() {},

    click1() {
      this.$http
        .post("/app")
        .then(res => {
          console.log("res",res);
          if (!res.data) {
            return this.$message.error("失败");
          }
          console.log(res.data);
          this.$message.success("成功");
        })
        .catch(res => {
          this.$message.error("网络繁忙");
        });
    }
  }
};
</script>
<style lang="less" scoped>
</style>
