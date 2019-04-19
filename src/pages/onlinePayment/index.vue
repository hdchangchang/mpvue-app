<template>
  <div class="mainpage">
    
    <div class="order-info">
      <span class="pay-ts">请尽快完成支付！<span class="countDown">60s</span></span>
      <div class="pay-info">
        <span>应付：<span class="num">￥{{preAmount}}</span></span>
        <span>
          订单详情 <span class="i-right"></span>
        </span>
      </div>
    </div>
    <div class="pay-type">
      <span class="pay-btn pay-wx" v-if="channelType==2" @click="pay">微信支付</span>
      <span class="pay-btn pay-ye" v-else @click="pay">余额支付</span>
    </div>

    <key-board v-model="password"></key-board>
  </div>
</template>

<script src="./index.js"></script>
<style scoped lang="scss">
  @import './index.scss';
</style>
