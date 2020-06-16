<template>
  <div class="page-hero">
    <div class="topbar bg-black py-2 px-3 font-white d-flex ai-center">
      <img src="../assets/logo1.png" height="30" alt />
      <div class="px-3 flex-1">
        <span class="font-whitr">王者荣耀</span>
        <span class="font-whitr ml-2">攻略站</span>
      </div>
      <router-link to="/" tag="div">更多英雄 &gt;</router-link>
    </div>
    <!-- <h1>{{id}}</h1> -->
    <div class="top" :style="{'background-image':`url(${model.banner})`}">
      <div class="info font-light p-3 h-100 d-flex flex-column jc-end">
        <div class="fs-sm">{{model.title}}</div>
        <h2 class="my-1">{{model.name}}</h2>
        <div class="fs-sm">{{model.categories.map(v => v.name).join('/')}}</div>
        <div class="d-flex jc-between py-1">
          <div class="scores d-flex ai-center" v-if="model.scores">
            <span>难度</span>
            <span class="badge bg-primary">{{model.scores.difficult}}</span>
            <span>技能</span>
            <span class="badge bg-blue">{{model.scores.skills}}</span>
            <span>攻击</span>
            <span class="badge bg-danger">{{model.scores.attack}}</span>
            <span>生存</span>
            <span class="badge bg-black-2">{{model.scores.survive}}</span>
          </div>
          <router-link to="/" tag="span" class="font-grey fs-sm">皮肤 2 &gt;</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      reuired: true
    }
  },
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`heroes/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style lang="scss">
.page-hero {
  .top {
    height: 50vw;
    background: #fff no-repeat top center;
    background-size: auto 100%;
  }
  .info {
    background: linear-gradient(to top, black, rgba(0, 0, 0, 0));
    .badge {
      margin: 0 0.5rem;
      display: inline-block;
      width: 1rem;
      height: 1rem;
      line-height: 1.1rem;
      text-align: center;
      border-radius: 50%;
      font-size: 0.6rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
  }
}
</style>
