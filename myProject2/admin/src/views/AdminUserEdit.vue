<template>
  <div class="about">
    <h1>{{_id ? '编辑' : '新建'}}管理员</h1>
    <el-form label-width="130px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  props: {
    _id: {}
  },
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async save() {
      let res;
      if (this._id) {
        res = await this.$http.put(`rest/admin_users/${this._id}`, this.model);
      } else {
        res = await this.$http.post("rest/admin_users", this.model);
      }
      this.$router.push("/admin_users/list");
      console.log(res);
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/admin_users/${this._id}`);
      this.model = res.data;
      // console.log(res);
      // console.log(this.model);
      // console.log(this._id);
    }
  },
  created() {
    this._id && this.fetch();
    // console.log(this._id);
  }
};
</script>