<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- :model 绑定数据 -->
      <el-form ref="loginRef" :model="loginFrom" :rules="rules" label-width="0px" class="login_form">
        <el-form-item prop="username">
          <el-input v-model="loginFrom.username" prefix-icon="el-icon-search"></el-input>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginFrom: {
        username: "a",
        password: "a"
      },
      rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
      }
    };
  },
  methods: {
    resetLoginFrom() {
      this.$refs.loginRef.resetFields();
      console.log(this.$refs.loginRef);
      
    },
    login(){
      this.$refs.loginRef.validate(async valid =>{
          console.log(valid);
          if (!valid) return;
          const rs = await this.$http.post("", this.loginFrom);
          console.log(rs.data);
          if(rs.data.code == 200){
            return this.$message.success('登录成功');
          }
          

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
  top: 50%;
  transform: translate(-50%);
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
