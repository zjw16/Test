<template>
  <div>
    <div class="topbar bg-black py-2 px-3 font-white d-flex ai-center">
      <img src="../assets/logo1.png" height="30" alt />
      <div class="px-3 flex-1">
        <div class="font-whitr">王者荣耀</div>
        <div class="font-black-2 fs-xxs">团队成就更多</div>
      </div>
      <button type="button" class="btn bg-primary">立即下载</button>
    </div>

    <div class="nav bg-primary font-white pt-3 pb-2 nav-inverse jc-around">
      <div class="nav-item active">
        <router-link class="nav-link" tag="div" to="/">首页</router-link>
      </div>
      <div class="nav-item">
        <router-link class="nav-link" tag="div" to="/">攻略中心</router-link>
      </div>
      <div class="nav-item">
        <router-link class="nav-link" tag="div" to="/">赛事中心</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.topbar {
  position: sticky; // 吸顶
  top: 0;
  z-index: 10;
}
</style>
