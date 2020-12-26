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
          <el-input
            placeholder="请输入姓名"
            v-model="dto.user.name"
            clearable
            @clear="click1"
          ></el-input>
        </el-col>
        <el-button type="primary" @click="click1">搜索用户</el-button>
        <el-button type="primary" v-has="user - add" @click="addUser()"
          >添加用户</el-button
        >
      </el-row>
      <!-- 表格 -->
      <el-table :data="tableData.userList" border stripe>
        <!-- <el-table-column type="index"></el-table-column> -->
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column label="性别" prop="sexStr"></el-table-column>
        <el-table-column label="密码" prop="password"></el-table-column>
        <el-table-column label="地址" prop="adress"></el-table-column>

        <!-- <el-table-column
          label="角色"
          prop="rolesuser"
          :formatter="getRoleName"
        ></el-table-column> -->
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              @change="changeSwitch(scope.row)"
              >></el-switch
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130">
          <template slot-scope="scope">
            <!--修改按钮-->
            <el-button
              type="primary"
              v-has="user - update"
              icon="el-icon-edit"
              size="mini"
              @click="editUser(scope.row.id)"
            ></el-button>

            <!--删除按钮-->
            <el-button
              type="danger"
              v-has="user - del"
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
    <el-dialog title="添加用户" :visible.sync="add" >
      <el-form :model="addUserDTO">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input
            v-model="addUserDTO.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="addUserDTO.password" autocomplete="off"  ></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="addUserDTO.adress" autocomplete="off"  ></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="addUserDTO.sex" placeholder="请选择性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAddUser()">取 消</el-button>
        <el-button type="primary" @click="confirmAddUser()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改用户" :visible.sync="edit">
      <el-form :model="editUserVO">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="editUserVO.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="editUserVO.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="editUserVO.adress" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="editUserVO.sex" placeholder="请选择性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="edit = false">取 消</el-button>
        <el-button type="primary" @click="confirmEditUser()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="删除用户" :visible.sync="del" width="30%">
      <span>是否删除该用户</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="del = false">取 消</el-button>
        <el-button type="primary" @click="confirmDelUser()">确 定</el-button>
      </span>
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
      user: {
        status: 0,
        Id: 0,
      },
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      add: false,
      edit: false,
      del: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      editUserVO: {
        id: "",
        name: "",
        password: "",
        adress: "",
        sex: "",
      },
      formLabelWidth: "140px",
      delUserDTO: {
        id: 0,
      },
      editUserDTO: {
        id: 0,
      },
      addUserDTO: {
        name: "",
        password: "",
        adress: "",
        sex: "",
      },
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
      this.$http.post("/getUserPage", this.dto).then((res) => {
        console.log("res.data.code", res.data.code);
        this.tableData = res.data.data;
        this.dto.total = res.data.data.total;
        console.log("this.tableData", this.tableData);
      });
    },
    changeSwitch(data) {
      console.info("changeSwitch", data);
      this.user = data;
      this.$http.post("/changeStatuFlag", this.user).then((res) => {
        console.log("res.data.code", res.data.code);
      });
    },

    delUser(data) {
      console.info("delUser", data);
      this.delUserDTO.id = data;
      if (data == 1) {
        this.$message.error("超级用户无法进行操作");
        return;
      }
      this.del = true;
    },

    confirmDelUser() {
      this.del = false;
      let id = this.delUserDTO.id;
      this.$http.post("/delUser", id).then((res) => {
        console.info("confirmDelUser~res", res);
        if (res.data.code == 200) {
          this.$message.success("删除成功");
        }
        this.click1();
      });
    },
    editUser(data) {
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
    addUser() {
      this.add = true;
    },
    cancelAddUser(formName) {
      this.add = false;
      this.$refs[formName].resetFields(); // 重置表单移除校验
    },
    confirmAddUser() {
      this.add = false;
      console.info("confirmAddUser", this.addUserDTO);
      this.$http.post("/addUser", this.addUserDTO).then((res) => {
        if (res.data.code == 200) {
          this.$message.success("新增成功");
        }
        this.click1();
      });
    },
    handleClose() {
      // this.$refs[formName].resetFields(); // 重置表单移除校验
    },
  },
};
</script>
  <style lang="less" scoped>
.wigth_input {
  width: 280px;
  
}

</style>
