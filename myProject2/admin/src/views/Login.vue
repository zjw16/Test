<template>
  <div class="login-container">
    <el-card header="请登录" class="login-card">
      <!-- native表示监听原生表单事件 prevent表示阻止表单默认提交不要跳转页面 -->
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post("login", this.model);
      // localStorage.token = res.data.token;
      sessionStorage.token = res.data.token;
      this.$router.push("/");
      this.$message({
        type: "success",
        message: "登录成功"
      });
      console.log(res.data);
    }
  }
};
</script>

<style>
/* .login-container {
  display: flex;
  justify-content: center;
} */

.login-card {
  width: 28rem;
  margin: 10rem auto;
}
</style>
