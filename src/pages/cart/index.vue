<template>
  <div class="mainpage">
    <div class="page-header">
      <div>
        <span class="ibox">
          <i class="i-location-active"></i>
        </span>
        <span class="site-name">{{siteName}}</span>
      </div>
    </div>
    <div class="cart-list">
      <div class="cart-module" v-for="(item,index) in goods" :key="index">
        <div class="cart-module-top" @click="clickCheckModule(item)">
          <span :class="[item.check?'i-check':'i-check-no']"></span>
          <span>
            {{item.planDate}}&nbsp;&nbsp;{{item.businessTime}}&nbsp;&nbsp;取餐
          </span>
        </div>
        <div class="cart-module-list">
          <div class="cart-item" v-for="(itm,idx) in item.goods" :key="idx">
            <span :class="[itm.check?'i-check':'i-check-no']" @click="clickCheckItm(itm,item)"></span>
            <div class="cart-item-main" @click="clickCheckItm(itm,item)">
              <image class="cart-item-img" :src="itm.goodsSmall"></image>
              <div class="cart-item-info">
                <div class="cart-item-infotop">
                  <p class="cart-item-name">{{itm.goodsName}}</p>
                  <p class="cart-item-stock">{{itm.stockName}}</p>
                </div>
                <div class="cart-item-b">
                  <div>
                    <span class="cart-item-price">¥{{itm.prePrice}}</span>
                    <span class="cart-item-oldPrice" v-if="itm.prePrice<itm.goodsMoney">¥{{itm.goodsMoney}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="num-box">
              <i-number v-model="itm.count" :max="itm.stock" @changeHandle="changeHandle(itm)"></i-number>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cart-tj">
      <div class="cart-tj-l" @click="clickCheckAll">
        <span :class="[checkAll?'i-check':'i-check-no']"></span>
        <span>全选</span>
      </div>
      <div class="cart-tj-r">
        <div class="cart-tj-num">
          <p>合计 <span class="num">¥{{totalPrice}}</span></p>
          <p>已减免 ¥{{totalReduce}}</p>
        </div>
        <div class="account-btn" @click='buy'>去结算</div>
      </div>
    </div>
    <!-- tabbar -->
    <tab-bar :activeIndex="1"></tab-bar>
  </div>
</template>

<script src="./index.js"></script>
<style scoped lang="scss">
  @import './index.scss'

</style>
