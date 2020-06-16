<template>
  <div>
    <swiper :options="swiperOptions">
      <swiper-slide>
        <img class="w-100" src="../assets/imgs/1.png" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/imgs/2.png" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/imgs/3.png" alt />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 font-black">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light-1 py-2 font-sm mr-1">
        <i class="sprite sprite-arrow"></i>
        收起
      </div>
    </div>

    <m-list-card icon="cc-menu-circle" title="新闻资讯" :categories="newsCats">
      <template #items="{cate}">
        <router-link
          tag="div"
          :to="`/articles/${news._id}`"
          v-for="(news,index) in cate.newsList"
          :key="index"
          class="py-2 fs-md d-flex"
        >
          <span class="font-black-2">[{{news.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 font-black text-ellipsis pr-2">{{news.title}}</span>
          <span class="font-grey">{{news.createdAt | date}}</span>
        </router-link>
      </template>
    </m-list-card>

    <m-list-card icon="Headache" title="英雄列表" :categories="heroCats">
      <template #items="{cate}">
        <div class="d-flex flex-wrap" style="margin:0 -0.5rem;">
          <router-link
            tag="div"
            :to="`/heroes/${hero._id}`"
            v-for="(hero,index) in cate.heroList"
            :key="index"
            class="p-2 text-center"
            style="width:20%;"
          >
            <img :src="hero.avatar" class="w-100" alt />
            <div>{{hero.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>

    <m-card icon="Headache" title="精彩视频"></m-card>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    }
  },

  data() {
    return {
      swiperOptions: {
        autoplay: true,
        loop: true,
        pagination: {
          el: ".pagination-home"
        }
      },
      newsCats: [],
      heroCats: []
    };
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get("/news/list");
      this.newsCats = res.data;
      console.log(res.data);
    },
    async fetchHeroCats() {
      const res = await this.$http.get("/heroes/list");
      this.heroCats = res.data;
      console.log(res.data);
    }
  },
  created() {
    this.fetchNewsCats();
    this.fetchHeroCats();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/style.scss";

.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background-color: #fff;
    &.swiper-pagination-bullet-active {
      background-color: map-get($colors, "info");
    }
  }
}

.nav-icons {
  border-top: 1px solid map-get($colors, "light");
  border-bottom: 1px solid map-get($colors, "light");
  .nav-item {
    width: 25%;
    border-right: 1px solid map-get($colors, "light");
    &:nth-child(4n) {
      border-right: none;
    }
  }
}

.sprite {
  background: url("../assets/imgs/index.png") no-repeat 0 0;
  background-size: 28.8462rem;
  display: inline-block;

  &.sprite-news {
    width: 1.7692rem;
    height: 1.5385rem;
    background-position: 63.546% 15.517%;
  }

  &.sprite-arrow {
    width: 0.7692rem;
    height: 0.7692rem;
    background-position: 38.577% 52.076%;
  }
}

.fs-lg {
  font-family: 黑体;
  font-weight: bold;
}
</style>
