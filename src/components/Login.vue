<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- :model 绑定数据 -->
      <el-form
        ref="loginRef"
        :model="loginFrom"
        :rules="rules"
        label-width="0px"
        class="login_form"
      >
        <el-form-item prop="name">
          <el-input v-model="loginFrom.name" prefix-icon="el-icon-search"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginFrom.password" prefix-icon="el-icon-search"></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginFrom">重置</el-button>
        </el-form-item>
      </el-form>
      
    </div>
  <div class="tip">普通用户账号：normal  密码：123456
  </div>
  <div class="tip1">超级用户账号：root 密码：123456
  </div>
  </div>

  
</template>

<script>
export default {
  data() {
    return {
      loginFrom: {
        name: "root",
        password: "123456"
      },
      
    };
  },
  methods: {
    resetLoginFrom() {
      this.$refs.loginRef.resetFields();
      console.log(this.$refs.loginRef);
    },
    login() {
      this.$refs.loginRef.validate(valid => {
        console.log("valid", valid);
        if (!valid) return;
        const rs = this.$http
          .post("/login", this.loginFrom)
          .then(res => {
            console.log("response", res);
            if (res.data.code != 200) {
              return ;
            }
            window.sessionStorage.setItem("token", res.data.data.session);
            window.sessionStorage.setItem("username", res.data.data.username);
            window.sessionStorage.setItem("btnPermissions", JSON.stringify(res.data.data.permissionVOS))
            this.$router.push("/home");
          })
      });
    }
  }
};
</script>


<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 25%;
  transform: translate(-50%);
}
.tip{
    width:400px;height:25px;  /*设置div的大小*/
    font-size:20px;
    border:4px solid #beceeb; /*为了便于观察，显示出边框*/
    display:table-cell; 
    vertical-align:bottom;
}
.tip1{
  width:400px;height:25px;  /*设置div的大小*/
    font-size:20px;
    border:4px solid #beceeb; /*为了便于观察，显示出边框*/
    display:table-cell; 
    vertical-align:bottom;
}
.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}

.btn {
  display: flex;
  justify-content: flex-end;
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
