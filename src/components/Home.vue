<template>
  <el-container class="home">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <span>权限管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <el-submenu :index="item.pid + ''" v-for="item in menuList" :key="item.pid">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.typeName}}</span>
            </template>
            <!-- <el-menu-item index="user">用户列表</el-menu-item> -->
            <el-menu-item
              :index="subItem.typePath +''"
              v-for="subItem in item.children"
              :key="subItem.pid"
            >
              <span>{{subItem.typeName}}</span>
            </el-menu-item>
          </el-submenu>
          <!-- <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="role">角色列表</el-menu-item>
            <el-menu-item index="role-manage">权限列表</el-menu-item>
          </el-submenu>-->
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 左侧菜单数据
      menuList: []
    };
  },
  created() {
    this.getMenuList();
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$http.get("/logout", "");
      this.$router.push("login");
    },
    getMenuList() {
      let btnPermissionsStr = sessionStorage.getItem("btnPermissions");
      btnPermissionsStr = JSON.parse(btnPermissionsStr);
      this.menuList = btnPermissionsStr;
      console.log("menuList", this.menuList);
    }
  }
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #373c41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 25px;
  > div {
    display: flex;
    align-items: center;
  }
}
.el-aside {
  background-color: #323744;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf2;
}
.home {
  height: 100%;
}
</style>
