<template>
  <div class="mainpage">
    <div class="goods-info">
      <image class="goods-img" :src="goodsHead"></image>
      <div class="goods-tit">
        <h6 class="tit">{{goodsName}}</h6>
        <div class="chili" v-if="chili.length!=0">
          <template v-for="(itm,idx) in chili">
            <span class="i-la" v-if="itm==1" :key="idx"></span>
            <span class="i-nola" v-if="itm==0" :key="idx"></span>
          </template>
        </div>
      </div>
      <div class="goods-labelbox">
        <span class="goods-label" v-for="(itm,idx) in goodsLabels" :key="idx"
          :style="{background:itm.color}">{{itm.txt}}</span>
      </div>
      <div class="price-box">
        <div>
          <span class="price">
            ¥ {{prePrice}}
          </span>
          <span class="old-price">
            ¥ {{goodsMoney}}
          </span>
        </div>
        <div class="addcount">
          <iNumber :max="count" :num.sync="num" @changeNum="changeNum"></iNumber>
        </div>
      </div>
      <div class="goods-detail">{{goodsDetails}}</div>
    </div>
    <div class="goods-opera">
      <template v-if="goodsCount==0">
        已售罄
      </template>
      <template v-else>
        <div class="cartbox">
          <span class="cart">
            <i class="i-cart"></i>
            <span class="num">{{cartTotalNum}}</span>
          </span>
        </div>
        <div class="btnbox">
          <span class="btn" @click="addtoCart">加入购物车</span>
          <span class="btn active" @click="buy">立即购买</span>
        </div>
      </template>
    </div>

    <!-- 登录弹出框 -->
    <pop popName="popLogin">
      <login></login>
    </pop>

  </div>
</template>
<script src="./index.js"></script>
<style scoped lang="scss" scoped>
  @import './index.scss';

</style>
