import {
  AskforBannerList,
  AskforPlanList,
  AskforGoodsList
} from '@/services/index.js'

import store from '@/store/index.js'
import { linkTo } from '@/utils/index.js'

import tabBar from '@/components/tabBar.vue'

export default {
  components: { tabBar },
  store,
  data() {
    return {
      site: {
        siteName: ''
      },
      // banner 相关
      bannerActiveIndex: 0,
      bannerList: [],
      // planList
      currentIndex: 0, // 当前选中日期
      planList: [],
      goodsList: []
    }
  },

  created() {
    this.setSiteName()
    if (!this.site.siteName) {
      mpvue.navigateTo({
        url: '/pages/map/main'
      })
    }
  },
  onShow() {
    this.setSiteName()
    this.bannerToggle()
    this._AskforPlanList()
    this._AskforBannerList()
  },
  computed: {
    today() {
      const now = new Date()
      const y = now.getFullYear()
      let m = now.getMonth() + 1
      let d = now.getDate()
      m = m.length < 2 ? '0' + m : m
      d = d.length < 2 ? '0' + d : d
      return y + m + d
    }
  },
  watch: {
    currentIndex(newV, oldV) {
      this._AskforGoodsList()
    }
  },
  methods: {
    toGoodsDetail(goodsId) {
      linkTo('/pages/goodsDetail/main?goodsId=' + goodsId)
    },
    toMap() {
      linkTo('/pages/map/main')
    },
    bannerToggle() {
      const t1 = setInterval(() => {
        const lastbannerActiveIndex = this.bannerActiveIndex
        const bannerActiveIndex = lastbannerActiveIndex + 1
        this.bannerActiveIndex = bannerActiveIndex >= this.bannerList.length ? 0 : bannerActiveIndex
      }, 3000)
    },
    setSiteName() {
      const siteName = mpvue.getStorageSync('siteName')
      const siteId = mpvue.getStorageSync('siteId')
      this.site.siteName = siteName
      this.site.siteId = siteId
    },
    _AskforPlanList() {
      const that = this
      const siteId = that.site.siteId
      new AskforPlanList({
        body: {
          siteId
        }
      }).send().then((data) => {
        this.planList = data.dates
        this.planList.forEach((itm, idx) => {
          if (itm.date == that.today) {
            this.currentIndex = idx
          }
        })
        this._AskforGoodsList()
      })
    },
    _AskforBannerList() {
      const that = this
      new AskforBannerList().send().then((data) => {
        that.bannerList = data.banners
      })
    },
    _AskforGoodsList(index) {
      const that = this
      if (index) {
        that.currentIndex = index
      }
      const date = that.planList[that.currentIndex].date
      new AskforGoodsList({
        body: {
          siteId: that.site.siteId,
          date
        }
      }).send().then((data) => {
        const {
          firstMealC,
          secondMealC,
          ratioC,
          discountC
        } = that.$store.state.labelColor
        data.forEach((itm, idx) => {
          const aLabel = []
          const {
            goodsLabel,
            sellTime,
            ratio
          } = itm
          if (sellTime == '20') {
            aLabel.push({
              txt: '午餐',
              color: secondMealC
            })
          } else if (sellTime == '10') {
            aLabel.push({
              txt: '早餐',
              color: firstMealC
            })
          }
          if (Number(ratio) >= 0 && Number(ratio) < 1) {
            aLabel.push({
              txt: ratio + '折',
              color: ratioC
            })
          }
          const labels = goodsLabel.split('、')
          labels.forEach((itm, idx) => {
            if (itm.txt == '预顶8折') {
              aLabel.push({
                txt: itm,
                color: discountC
              })
            } else {
              // aLabel.push({ txt: itm, color: labelC })
            }
          })
          itm.aLabel = aLabel
        })
        that.goodsList = data
      })
    }
  }
}
