<template>
  <m-card :icon="icon" :title="title">
    <div class="nav jc-between">
      <div
        class="nav-item"
        :class="{active:active===index}"
        @click="$refs.list.$swiper.slideTo(index)"
        v-for="(cate,index) in categories"
        :key="index"
      >
        <div class="nav-link">{{cate.name}}</div>
      </div>
    </div>
    <div class="pt-3">
      <swiper
        ref="list"
        :options="{autoHeight:true}"
        @slide-change="()=>active=$refs.list.$swiper.realIndex"
      >
        <swiper-slide v-for="(cate,index) in categories" :key="index">
          <slot name="items" :cate="cate"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>

<script>
export default {
  props: {
    icon: { type: String, require: true },
    title: { type: String, require: true },
    categories: { type: Array, require: true }
  },
  data() {
    return {
      active: 0
    };
  }
};
</script>

<style>
</style>