<template>
  <div class="mainpage">
    <div class="order-top">
      <p>取餐地点：{{siteName}}</p>

      <p v-if="orderStatus==300">订单状态：待取餐</p>
      <p v-if="orderStatus==200">订单状态：订单待付款</p>
      <p v-if="orderStatus==401">订单状态：订单已完成 未按时取餐</p>
      <p v-if="orderStatus==400">订单状态：订单已完成</p>
      <p v-if="orderStatus==301">订单状态：订单已取消</p>

    </div>
    <div class="order-module" v-for="(item,index) in orderList" :key="index">
      <div class="order-time">{{item.planDate+'&nbsp;&nbsp;'+item.businessTime+'&nbsp;&nbsp;'+'取餐'}}</div>
      <div class="order-goods" v-for="(itm,idx) in item.orderVOs" :key="idx">
        <image :src="itm.picurl"></image>
        <div class="goods-info-box">

          <p class="goods-info">
            <span class="goods-nm">{{itm.mcdname}}</span>
            <span>x{{itm.number}}</span>
            <span>¥{{itm.prePrice}}</span>
          </p>
          <div class="getfood btn" v-if="orderStatus== 300 &&itm.planDate.substr(0,8) == formatDate">
            <span>
              扫码取餐
            </span>
          </div>
          <div class="getfood no-btn" v-else-if="orderStatus== 300">
            <span>
              {{item.week}}来取
            </span>
          </div>
          <div class="getfood normal" v-else-if="orderStatus== 401">
            <span>超时未取</span></div>
          <div class="getfood normal" v-else-if="orderStatus== 400">
            <span>
              已取餐
            </span>
          </div>
          <div class="getfood normal active" v-else-if="orderStatus== 500">
            <span>
              已退单
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="order-module">
      <p>{{'共：'+orderSum+'件'+'&nbsp;&nbsp;|&nbsp;&nbsp;实付：¥'+preAmount}}</p>
    </div>
    <div class="order-module">
      <p>交易单号：{{orderId}}</p>
      <p>下单时间：{{payTime}}</p>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style scoped lang="scss">
  @import './index.scss';

</style>
