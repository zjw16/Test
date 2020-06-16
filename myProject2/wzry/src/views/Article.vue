<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-2 px-3 border">
      <div class="el-icon-arrow-left title"></div>
      <strong class="flex-1 text-ellipsis title pl-2">{{model.title}}</strong>
      <div class="font-grey fs-xs">2020-6-10</div>
    </div>
    <div v-html="model.body" class="px-3 body fs-md"></div>
    <div class="px-3 border-top py-2">
      <div class="d-flex ai-center pb-2">
        <div class="el-icon-view"></div>
        <strong class="title fs-md ml-1">相关资讯</strong>
      </div>
      <router-link
        class="text-ellipsis py-1"
        tag="div"
        v-for="item in model.related"
        :key="item"
        :to="`/articles/${item._id}`"
      >{{item.title}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true }
  },
  data() {
    return {
      model: null // 或者此处写成 model:{} 便可以去掉v-if="model" 同时不会报错
    };
  },
  watch: {
    id: "fetch"
    // id(){
    //   this.fetch()
    // }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/style.scss";

.page-article {
  .border {
    .el-icon-arrow-left {
      font-size: 1.3846rem;
    }
    border-bottom: 1px solid map-get($colors, "light");
    .title {
      color: #4394e4;
    }
  }
  .body {
    p {
      line-height: 1.5rem;
    }
    img {
      max-width: 100%;
      height: auto;
    }
    iframe {
      width: 100%;
      height: auto;
    }
  }
  .border-top {
    border-top: 2px solid map-get($colors, "light");
  }
}
</style>