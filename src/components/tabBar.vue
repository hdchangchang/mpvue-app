<template>
  <div class="tab-box">
    <span class="tab-item" 
          :class="{active:activeIndex==index?true:false}" 
          v-for="(item,index) in tabList" 
          :key="index" 
          @click="changeTab(item,index)">
      <image class="tab-img" v-if="activeIndex==index" :src="item.activeImgSrc"></image>
      <image class="tab-img" v-else :src="item.imgSrc"></image>
      <span class="tab-txt">{{item.txt}}</span>
      <span v-if="index==1 && cartNum>0" class="num">{{cartNum}}</span>
      <span v-if="index==2 && hasPendingOrder" class="dot"></span>
    </span>
  </div>
</template>

<script>
import { linkTo } from '@/utils/index.js'
import { AskforCartList, AskforTakeSum } from '@/services'
export default {
  props: {
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      cartNum: 0, // 购物车数量
      hasPendingOrder: false, // 是否 有待处理订单
      tabList: [{
        txt: '订餐',
        imgSrc: require('@/static/img/tab/home.png'),
        activeImgSrc: require('@/static/img/tab/homeActive.png'),
        link: '/pages/index/main'
      }, {
        txt: '购物车',
        imgSrc: require('@/static/img/tab/cart.png'),
        activeImgSrc: require('@/static/img/tab/cartActive.png'),
        link: '/pages/cart/main'
      }, {
        txt: '订单',
        imgSrc: require('@/static/img/tab/order.png'),
        activeImgSrc: require('@/static/img/tab/orderActive.png'),
        link: '/pages/order/main'
      }, {
        txt: '我的',
        imgSrc: require('@/static/img/tab/mine.png'),
        activeImgSrc: require('@/static/img/tab/mineActive.png'),
        link: '/pages/mine/main'
      }]
    }
  },
  mounted() {
    this._AskforCartList()
    this._AskforTakeSum()
  },
  methods: {
    changeTab(item, index) {
      const token = mpvue.getStorageSync('token')
      if (!token) {
        this.$emit('testLogin')
      } else {
        linkTo(item.link)
      }
    },
    _AskforCartList() {
      const vmId = mpvue.getStorageSync('siteId')
      const customerId = mpvue.getStorageSync('customerId')
      const token = mpvue.getStorageSync('token')
      if (!vmId || !customerId || !token) return false
      new AskforCartList({ body: {
        vmId,
        customerId,
        token
      }}).send().then((res) => {
        this.cartNum = res.totalNum
      })
    },
    _AskforTakeSum() {
      const customerId = mpvue.getStorageSync('customerId')
      const token = mpvue.getStorageSync('token')
      if (!customerId || !token) return false

      new AskforTakeSum({ body: {
        customerId,
        token
      }}).send().then((res) => {
        res > 0 ? this.hasPendingOrder = true : this.hasPendingOrder = false
      })
    },
    // 改变购物车数量
    changeCartNum(v) {
      this.cartNum = v
    }
  }
}
</script>

<style lang="scss" scoped>
  .tab-box{
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    width: 100%;
    height: 1.2rem;
    border-top:1px solid #e1e1e1;
    z-index: 100;
    background:#fff;
  }
  .tab-item{
    position: relative;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex:1;
  }
  .tab-txt{
    font-size: 0.22rem;
    color: #999;
  }
  .active .tab-txt{
    color: #ff6900;
  }
  .tab-img{
    width: .5rem;
    height: .5rem;
  }

  .num{
    position: absolute;
    top:.1rem;
    right: .5rem;
    width: 0.3rem;
    height: 0.3rem;
    line-height: 0.3rem;
    color: #fff;
    background: #ff6900;
    border-radius: 50%;
    font-size: .18rem;
    text-align: center;
    overflow: hidden;
  }
  .dot{
    position: absolute;
    top:.16rem;
    right: .7rem;
    width: 0.18rem;
    height: 0.18rem;
    background: #ff6900;
    border-radius: 50%;
    overflow: hidden;
  }
</style>