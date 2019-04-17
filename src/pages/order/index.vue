<template>
  <div class="mainpage">
    <div class="order-tab">
      <span :class="{active:type=='wait'}" @click="changeType('wait')">
        <span>待取餐&nbsp;</span>
        <span v-if="waitList.length">{{waitList.length}}</span>
      </span>
      <span :class="{active:type=='all'}" @click="changeType('all')">全部订单</span>
    </div>
    <div class="order-list">
      <div class="order-item" v-for="(item,index) in showList" :key="index" @click="toOrderDetail(item)">
        <div class="order-item-top">
          <div class="order-site">
            <span class="i-location-active"></span>
            <span>{{item.vmName}}</span>
          </div>
          <span class="status" v-if="item.status == 200" style="color:#ec7088">待付款</span>
          <span class="status" v-else-if="item.status == 301">已取消</span>
          <span class="status" v-else-if="item.status == 300" style="color:#7ecef4">待取餐</span>
          <span class="status" v-else-if="item.status == 400 || item.status == 401 || item.status == 500">已完成</span>
        </div>
        <div class="order-item-main">
          <div class="order-itm" v-for="(itm,idx) in item.orderVOs" :key="idx">
            <image class="order-img" :src="itm.picurl"></image>
            <div class="order-info">
              <div class="goods-tit">
                {{itm.mcdname}}
              </div>
              <div class="goods-plan">
                <span class="goods-label" style="background:#f5d874">{{itm.planDate}}</span>
                <span class="goods-label"
                  :style="{background:itm.sellTime=='20'?'#8ad773':'#ffa39c'}">{{itm.sellTime=='20'?'午餐':'早餐'}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="order-item-footer">
          <span>{{item.createTime}}</span>
          <span>共&nbsp;<span class="num">{{item.totalSum}}&nbsp;</span>件商品&nbsp;&nbsp;实付&nbsp;<span
              class="num">¥{{item.totalAmount}}</span></span>
        </div>
      </div>
    </div>
    <tab-bar :activeIndex="2"></tab-bar>
  </div>
</template>

<script src="./index.js"></script>
<style scoped lang="scss">
  @import './index.scss'

</style>
