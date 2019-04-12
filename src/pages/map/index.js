import store from '@/store'
// import QQMapWX from '@/utils/qqmap/qqmap-wx-jssdk.js'
import iLocation from '@/static/svg/i-location.svg'

import {
  linkTo
} from '@/utils/index.js'

import {
  AskforSiteList
} from '@/services'

// let qqmapsdk

export default {
  store,
  components: {},
  data() {
    return {
      myPosition: {
        longitude: '',
        latitude: ''
      },
      toggleBtn: { // 地图和列表切换按钮 name
        name: '列表'
      },
      defaultSite: [],
      commendList: [],
      aroundList: [],
      siteList: [], // 点位列表 包括 格式化的 已选点位 推荐点位 附近点位
      markers: [], // 地图上展示的点位

      controls: [{
        id: 1,
        iconPath: '/resources/location.png',
        position: {
          left: 0,
          top: 300 - 50,
          width: 50,
          height: 50
        },
        clickable: true
      }]
    }
  },
  mounted() {
    // qqmapsdk = new QQMapWX({
    //   key: 'ZEGBZ-7VYHW-2CARF-OP5J4-OHP5H-SGBAT'
    // })
    // qqmapsdk.search({
    //   keyword: '酒店',
    //   success: function(res) {
    //     console.log(res)
    //   },
    //   fail: function(res) {
    //     console.log(res)
    //   },
    //   complete: function(res) {
    //     console.log(res)
    //   }
    // })
    console.log(this.$root.$mp)
    this.getPosition()
  },

  // onLoad(options) {
  //   // const a = options.a
  //   console.log(options)
  // },

  methods: {
    toIndex(item) {
      const siteId = item.siteId
      const siteName = item.siteName
      mpvue.setStorageSync('siteId', siteId)
      mpvue.setStorageSync('siteName', siteName)
      console.log(mpvue.getStorageSync('siteId'))
      linkTo('/pages/index/main')
    },
    markertap(e) {
      console.log(e)
    },
    callouttap(e) {
      const that = this
      console.log(e)
      that.aroundList.forEach((item) => {
        if (e.mp.markerId === item.id) {
          linkTo('/pages/index/main')
        }
      })
    },
    // 获取定位信息
    getPosition() {
      const that = this
      mpvue.getLocation({
        success(res) {
          console.log(res)
          const {
            longitude,
            latitude
          } = res
          that.myPosition = {
            longitude,
            latitude
          }
          // 附近点位
          that._AskforSiteList()
        },
        fail(err) {
          console.log(err)
        }
      })
    },
    //
    changeToggleBtnName() {
      const name = this.toggleBtn.name
      this.toggleBtn.name = name == '地图' ? '列表' : '地图'
    },
    // 获取附近点位
    _AskforSiteList() {
      const that = this

      new AskforSiteList({
        body: {
          city: '1', // 北京
          coordinate: this.myPosition.longitude + ',' + this.myPosition.latitude
        }
      }).send().then((data) => {
        const {
          defaultSite,
          commendList,
          aroundList
        } = data
        const siteList = [...defaultSite, ...commendList, ...aroundList]
        that.defaultSite = defaultSite
        that.commendList = commendList
        that.aroundList = aroundList

        siteList.forEach((item) => {
          let distance = parseInt(item.mansion.distance, 10) / 10000
          if (Math.floor(distance) >= 1) {
            distance = distance.toFixed(1) + 'km'
          } else {
            distance = parseInt(item.mansion.distance, 10) + 'm'
          }
          item.mansion.distance = distance
        })

        that.siteList = siteList

        const markers = []
        aroundList.forEach((item, index) => {
          console.log(item)
          const id = item.id
          const latitude = item.mansion.coordinate.split(',')[0]
          const longitude = item.mansion.coordinate.split(',')[1]
          const name = item.mansion.mansionName
          markers.push({
            id,
            latitude,
            longitude,
            iconPath: iLocation,
            width: 30,
            height: 30,
            alpha: 0.6,
            callout: {
              content: name + '\n\n' + '去这里 >>',
              display: 'BYCLICK',
              padding: '8',
              borderRadius: '5',
              color: '#666',
              fontSize: 10
            }
          })
        })
        that.markers = markers
      })
    }
  }
}
