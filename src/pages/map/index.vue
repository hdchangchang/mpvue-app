<template>
  <map-route :route-info="routeInfo"></map-route>
</template>

<script>
import store from '@/store'

// let plugin = requirePlugin('mapPlugin')

export default {
  store,
  data () {
    return {
      routeInfo: {}
    }
  },

  components: {
  },
  onShow () {
    let mapInfo = this.$store.state.addressInfo
    let routeInfo = {
      startLat: 39.90469, // 起点纬度 选填
      startLng: 116.40717, // 起点经度 选填
      startName: '我的位置', // 起点名称 选填
      endLat: mapInfo.endLat, // 终点纬度必传
      endLng: mapInfo.endLng, // 终点经度 必传
      endName: mapInfo.endName || '', // 终点名称 必传
      mode: 'car' // 算路方式 选填
    }
    this.routeInfo = routeInfo
  },
  methods: {
  },
  created () {
  }
}
</script>

<style scoped>

</style>
