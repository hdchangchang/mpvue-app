<template>
  <div class="mainpage">
    <div>
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
          <div class="cart-module-top">
            {{item.planDate}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.businessTime}}&nbsp;&nbsp;&nbsp;&nbsp;取餐
          </div>
          <div class="cart-module-list">
            <div class="cart-item" v-for="(itm,idx) in item.goods" :key="idx">
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
                  <div class="num-box">
                    {{num}}
                    <i-number :num="num" :max="itm.stock"></i-number>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <tab-bar :activeIndex="1"></tab-bar>
  </div>
</template>

<script src="./index.js"></script>
<style scoped lang="scss">
  @import './index.scss'

</style>
