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
          <el-button type="primary" @click="click1">查找用户</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table  :data="tableData.shiroUserList" border stripe>
        
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="姓名" ></el-table-column>
        <el-table-column label="密码" prop="password"></el-table-column>
        <el-table-column label="权限" prop="role"></el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="tableData.pagenum"
        :page-sizes="[1, 2, 3, 5]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.total"
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: {
        shiroUserList:[
          {
            name:null,
            password: null,
            role : null
    
          }
        ],
        pagesize: null,
        total: null,
        pagenum:1,
        size:10
      }
    };
  },

  methods: {
    handleSizeChange() {

    },

    handleCurrentChange() {
      console.log("handleCurrentChange");
      
    },

    click1() {
      this.$http
        .post("/getUserPage", this.tableData)
        .then(res => {
          console.log("res.data.code", res.data.code);
          if (res.data.code != 200) {
            return this.$message.error("失败");
          }
          console.log("res.data.data", res.data.data);
          this.$message.success("成功");
          this.tableData = res.data.data;
          console.log("this.tableData", this.tableData);
          
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
