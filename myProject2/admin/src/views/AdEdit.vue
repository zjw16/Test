<template>
  <div class="about">
    <h1>{{_id ? '编辑' : '新建'}}广告位</h1>
    <el-form label-width="80px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告" style="margin-bottom:20px;">
        <el-button @click="model.items.push({})" style="margin-bottom:20px;">
          <i class="el-icon-plus"></i>
          添加广告
        </el-button>
        <el-row type="flex" style="flex-wrap:wrap;">
          <el-col :md="24" v-for="(item,i) in model.items" :key="i">
            <el-form-item label="跳转链接">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="图片" style="margin-top:1rem;">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL+'/upload'"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="res=>$set(item,'image',res.url)"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button
                size="small"
                type="danger"
                @click="model.items.splice(i,1)"
                style="margin-left:80px;"
              >删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" style="margin-left:80px;">保存</el-button>
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
      model: {
        items: []
      }
    };
  },
  methods: {
    async save() {
      let res;
      if (this._id) {
        res = await this.$http.put(`rest/ads/${this._id}`, this.model);
      } else {
        res = await this.$http.post("rest/ads", this.model);
      }
      this.$router.push("/ads/list");
      console.log(res);
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this._id}`);
      this.model = Object.assign({}, this.model, res.data);
    }
  },
  created() {
    this._id && this.fetch();
    // console.log(this._id);
  }
};
</script>



