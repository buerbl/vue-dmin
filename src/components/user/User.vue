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
          <el-input placeholder="请输入姓名" v-model="dto.user.name" clearable @clear="click1"></el-input>
        </el-col>
        <el-button type="primary" @click="click1">搜索用户</el-button>
        <el-button type="primary" v-has="user-add">添加用户</el-button>
      </el-row>
      <!-- 表格 -->
      <el-table :data="tableData.userList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column label="密码" prop="password"></el-table-column>
        <el-table-column label="地址" prop="adress"></el-table-column>
        <el-table-column label="角色" prop="rolesuser" :formatter="getRoleName"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              @change="changeSwitch(scope.row)"
            >></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130">
          <template slot-scope="scope">
            <!--修改按钮-->
            <el-button type="primary" v-has="user-update" icon="el-icon-edit" size="mini"></el-button>
            <!--删除按钮-->
            <el-button type="danger" v-has="user-del" icon="el-icon-delete" size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="dto.pagenum"
        :page-sizes="[10, 15, 20, 50]"
        :page-size="dto.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dto.total"
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: {
        userList: [],
        // pagenum: null,
        total: 0,
        pagenum: 1,
        size: 10
      },
      dto: {
        user: {
          id: null,
          name: null
        },
        total: 0,
        pagenum: 1,
        size: 10
      }
    };
  },

  methods: {
    handleSizeChange(newSiza) {
      console.log(newSiza);
      this.dto.size = newSiza;
      console.log("dd", this.tableData);
      this.click1();
    },

    handleCurrentChange(pagenum) {
      console.log("handleCurrentChange22", this.tableData);
      this.dto.pagenum = pagenum;
      this.click1();
    },

    getRoleName(row, column) {
      var roleName = [];
      for (var i = 0; i < row.roleList.length; i++) {
        roleName.push(row.roleList[i].roleName);
      }
      return roleName.join();
    },
    click1() {
      console.log("/getUserPage", this.dto);
      this.$http
        .post("/getUserPage", this.dto)
        .then(res => {
          console.log("res.data.code", res.data.code);
          if (res.data.code != 200) {
            return this.$message.error(res.data.data);
          }
          console.log("res.data.data", res.data.data);
          this.$message.success("成功");
          this.tableData = res.data.data;
          this.dto.total = res.data.data.total;
          console.log("this.tableData", this.tableData);
        })
        .catch(res => {
          this.$message.error("网络繁忙");
        });
    },
    changeSwitch(data) {
      this.dto.user = data;
      console.log("sss", this.dto);
      console.log("aaa", data);
      // this.changeSwitch;
      this.$http
        .post("/changeStatuFlag", this.dto)
        .then(res => {
          console.log("res.data.code", res.data.code);
          if (res.data.code != 200) {
            return this.$message.error(res.data.data);
          }
          console.log("res.data.data", res.data.data);
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
