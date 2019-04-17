<template>
  <div class="mainpage">
    <div class="mine-top">
      <div class="user-tx">
        <image :src="userInfo.headImgUrl"></image>
      </div>
      <div class="user-info">
        <span>{{userInfo.customerName}}</span>
        <span>{{userInfo.phone}}</span>
      </div>
    </div>
    <div class="mine-main">
      <div class="mine-module">
        <h6>我的账户</h6>
        <div class="module-box">
          <div>
            <p>
              <span class="num">{{userInfo.balance}}</span>元
            </p>
            <p>余额</p>
          </div>
          <div>
            <p>
              <span class="num">{{userInfo.dinnerCardSum}}</span>张
            </p>
            <p>购餐卡</p>
          </div>
          <div>
            <p>
              <span class="num">{{userInfo.disCounts}}</span>张
            </p>
            <p>优惠券</p>
          </div>
        </div>
      </div>
      <div class="mine-module">
        <h6>我的服务</h6>
        <div class="module-box">
          <div>
            <p>
              <span class="i i-mine-que"></span>
            </p>
            <p>常见问题</p>
          </div>
          <div>
            <p>
              <span class="i i-mine-follow"></span>
            </p>
            <p>公众号</p>
          </div>
          <div>
            <p>
              <span class="i i-mine-set"></span>
            </p>
            <p>设置</p>
          </div>
        </div>
      </div>
    </div>
    <tab-bar :activeIndex="3"></tab-bar>
  </div>
</template>

<script src="./index.js"></script>
<style scoped lang="scss">
  @import './index.scss'

</style>
