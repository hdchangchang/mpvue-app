<template>
  <div class="tab-box">
    <span class="tab-item" v-for="(item,index) in tabList" :key="index">
      {{item}}
      <!-- <image v-if="activeIndex==index" :src="item.ActiveImgSrc"></image>
      <image v-else :src="item.imgSrc"></image>
      <span class="tab-txt">{{item.txt}}</span> -->
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 0,
      tabList: [
        {
          txt: '订餐',
          imgSrc: require('@/static/img/tab/home.png'),
          activeImgSrc: require('@/static/img/tab/homeActive.png')
        }, {
          txt: '购物车',
          imgSrc: require('@/static/img/tab/cart.png'),
          activeImgSrc: require('@/static/img/tab/cartActive.png')
        }, {
          txt: '订单',
          imgSrc: require('@/static/img/tab/order.png'),
          activeImgSrc: require('@/static/img/tab/orderActive.png')
        }, {
          txt: '我的',
          imgSrc: require('@/static/img/tab/mine.png'),
          activeImgSrc: require('@/static/img/tab/mineActive.png')
        }
      ]
    }
  },
  mounted() {
    console.log(999)
    console.log(typeof this.tabList)
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .tab-box{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1.2rem;
    border-top:1px solid #e1e1e1;
    z-index: 100;
    background:#fff;
  }

  .tab-txt{
    font-size: 0.36rem;
  }
</style>