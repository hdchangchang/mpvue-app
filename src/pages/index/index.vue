<template>
  <div class="mainpage">
    <div class="page-header" @click="toMap">
      <span class="ibox">
        <i class="i-location-active"></i>
      </span>
      <span class="site-name">{{site.siteName}}</span>
      <span class="ibox">
        <i class="i-right"></i>
      </span>
    </div>
    <div class="page-body">
      <div class="banner-box">
        <swiper class="banner-swiper" indicator-dots="true" indicator-color="#fff" indicator-active-color="red"
          autoplay="autoplay" circular="true" interval="3000" duration="500">
          <block v-for="(item,index) in bannerList" :key="index">
            <swiper-item>
              <img class="banner-img" :src="item.picUrl" />
            </swiper-item>
          </block>
        </swiper>
      </div>
      <div class="plan-box">
        <div class="plan-itm" :class="{active:currentIndex==index}" v-for="(item,index) in planList" :key="index"
          @click="currentIndex=index">
          <div class="plan-week">{{item.week}}</div>
          <div class="plan-day">{{item.day}}</div>
        </div>
      </div>
      <div class="goods-list">
        <div v-if="goodsList.length">
          <div class="goods-itm" v-for="(item,index) in goodsList" :key="index" >

            <div class="goods-img" @click="toGoodsDetail(item.id)">
              <image v-if="item.count==0" style="opacity:.5" class="img" :src="item.goodsSmall"></image>
              <image v-else class="img" :src="item.goodsSmall"></image>
            </div>
            <div class="goods-info" @click="toGoodsDetail(item.id)">
              <div class="goods-detail">
                <h6 class="goods-tit">
                  <div class="goods-tit-in">
                    <span class="i-box">
                      <i class="i-new"></i>
                    </span>
                    <span>{{item.goodsName}}</span>
                  </div>
                  <div class="lajiao"></div>
                </h6>
                <p class="goods-desc">{{item.goodsDetails}}</p>
                <p class="goods-labels">
                  <span class="goods-label" v-for="(itm,idx) in item.aLabel" :key="idx" :style="{background:itm.color}">
                    {{itm.txt}}
                  </span>
                </p>
              </div>
              <p class="goods-price">
                <span class="new-price">¥ {{item.prePrice}}</span>
                <span class="old-price" v-if="item.goodsMoney != item.prePrice">¥ {{item.goodsMoney}}</span>
              </p>
            </div>

            <div class="goods-opera">
              <template v-if="item.count!=0">
                <span class="i-box">
                  <i class="i-add-cart" @click="addCart(item)"></i>
                </span>
                <span class="goods-buy" @click="buy(item)">立即购买</span>
              </template>
              <template v-else>
                <span class="goods-buy disable">已售罄</span>
              </template>
            </div>
          </div>
        </div>
        <div class="nofood" v-else>
          <img mode="widthFix" src="../../static/img/nofood.png">
          <p class="txt">更多美食备餐中...</p>
        </div>
      </div>
      <div class="space"></div>
    </div>

    <!-- tabbar -->
    <tab-bar ref="tabBar" :activeIndex="0" @testLogin="testLogin"></tab-bar>

    <!-- login -->
    <pop popName="popLogin">
      <login></login>
    </pop>

  </div>
</template>

<script src="./index.js"></script>
<style scoped lang="scss" scoped>
  @import './index.scss';
</style>
