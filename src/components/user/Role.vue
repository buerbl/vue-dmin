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
          <el-input
            placeholder="请输入姓名"
            v-model="dto.user.name"
            clearable
            @clear="click1"
          ></el-input>
        </el-col>
        <el-button type="primary" @click="click1">搜索用户</el-button>
      </el-row>

      <!-- 表格 -->
      <el-table :data="tableData.userList" border stripe>
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="roleName" label="角色"></el-table-column>
        <el-table-column label="操作" width="130">
          <template slot-scope="scope">
            <!--修改按钮-->
            <el-button
              type="primary"
              v-has="role - update"
              icon="el-icon-edit"
              size="mini"
              @click="editRole(scope.row.id)"
            ></el-button>

            <!--删除按钮-->
            <el-button
              type="danger"
              v-has="role - del"
              icon="el-icon-delete"
              size="mini"
              @click="delUser(scope.row.id)"
            ></el-button>
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
      <el-dialog title="修改用户角色" :visible.sync="edit">
        <el-form :model="editRoleVO">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="editRoleVO.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色" :label-width="formLabelWidth">
            <el-select v-model="editRoleVO.sex" placeholder="请选择性别">
              <el-option label="admin" value="1"></el-option>
              <el-option label="normal" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="edit = false">取 消</el-button>
          <el-button type="primary" @click="confirmEditUser()">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: {
        userList: [],
        total: 0,
        pagenum: 1,
        size: 10,
      },
      dto: {
        user: {
          id: null,
          name: null,
        },
        total: 0,
        pagenum: 1,
        size: 10,
      },
      formLabelWidth:"150px",
      edit: false,
      del: false,
      editRoleVO:{

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

    click1() {
      this.$http.post("/getUserRolePage", this.dto).then((res) => {
        console.info("getUserRolePage", res.data);
        this.tableData = res.data.data;
        this.dto.total = res.data.data.total;
      });
    },
    editRole(data) {
      if (data == 1) {
        this.$message.error("超级用户无法进行操作");
        return;
      }
      this.edit = true;
      this.editUserDTO.id = data;

      this.$http.post("/getUserInfoById", this.editUserDTO.id).then((res) => {
        console.info("editUser~res", res.data.data);
        this.editUserVO = res.data.data;
        this.editUserVO.sex = String(res.data.data.sex);
      });
    },
    confirmEditUser() {
      this.edit = false;
      console.info("confirmEditUser", this.editUserVO);
      this.$http.post("/updateUserById", this.editUserVO).then((res) => {
        if (res.data.code == 200) {
          this.$message.success("更新成功");
        }
        this.click1();
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>
