<template>
  <div class="mainpage">
    <div class="order-top">
      <p>取餐地点：{{siteName}}</p>
    </div>
    <div class="order-module" v-for="(item,index) in orderList" :key="index">
      <div class="order-time module-tit">{{item.planDate+'&nbsp;&nbsp;'+item.businessTime+'&nbsp;&nbsp;'+'取餐'}}</div>
      <div class="order-goods" v-for="(itm,idx) in item.orderVOs" :key="idx">
        <image :src="itm.picurl"></image>
        <div class="goods-info-box">

          <p class="goods-info">
            <span class="goods-nm">{{itm.mcdname}}</span>
            <span>x {{itm.number}}</span>
            <span>¥ {{itm.prePrice}}</span>
          </p>
          <div>
            <lable class="goods-label" :style="{background:itm.sellTime=='10'?'#ffa39c':'#8ad773'}">{{itm.sellTime=='10'?'早餐':'午餐'}}</lable>
          </div>
        </div>
      </div>
    </div>
    <div class="order-module">
      <p class="yh">
        <span>{{card==''?'未使用构餐卡':card}}</span>
        <span>-¥ {{cardAmount}}</span>
      </p>
      <p class="yh">
        <span>{{defaultDis==''?'未使用优惠券':defaultDis}}</span>
        <span>-¥ {{discountAmount}}</span>
      </p>
    </div>
    <div class="order-module">
      <p class="tj">共：{{orderSum}}件&nbsp;&nbsp;|&nbsp;&nbsp;实付：¥ <span class="num-obvious">{{preAmount}}</span></p>
    </div>
    <div class="order-module">
      <div class="module-tit">支付方式</div>
      <div class="pay-list">
        <div class="pay-item">
          <span>余额支付</span>
          <span class="i-check"></span>
        </div>
        <div class="pay-item">
          <span>微信支付</span>
          <span  class="i-check-no"></span>
        </div>
      </div>
    </div>

    <div class="paybox">
      <span class="pay-l">已优惠: ¥ {{promotionAmount}}&nbsp;&nbsp;&nbsp;&nbsp;合计: ¥ <span class="num-obvious">{{preAmount}}</span></span>
      <span class="pay-btn" @click="pay">去支付</span>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style scoped lang="scss">
  @import './index.scss';

</style>
