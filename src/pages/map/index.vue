<template>
  <div class="map-box">
    <!-- 地图 -->
    <map id="map" v-if="toggleBtn.name=='列表'" :longitude="myPosition.longitude" :latitude="myPosition.latitude" scale="13"
      :controls="controls" :markers="markers" :callout="callout" @callouttap="callouttap" bindcontroltap="controltap"
      @markertap="markertap" bindregionchange="regionchange" show-location>
      <cover-view class="map-footer">
        <cover-view class="item" @tap="changeToggleBtnName">{{toggleBtn.name}}</cover-view>
        <cover-view class="item" @tap="toSearch">搜索</cover-view>
      </cover-view>
    </map>
    <!-- 列表 -->
    <div v-else>
      <ul class="site-ul">
        <li class="site-li" v-for="(item,index) in siteList" :key="index" @click="toIndex(item)">
          <h6 class="site-name">
            <span>
              {{item.siteName}}
            </span>
            <span class="distance">
              {{item.mansion.distance}}
            </span>
          </h6>
          <p class="site-p">
            {{item.mansion.mansionSite}}
          </p>
        </li>
      </ul>
      <cover-view class="map-footer">
        <cover-view class="item" @tap="changeToggleBtnName">{{toggleBtn.name}}</cover-view>
        <cover-view class="item" @tap="toSearch">搜索</cover-view>
      </cover-view>
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style scoped lang="scss">
  @import './index.scss'
</style>
