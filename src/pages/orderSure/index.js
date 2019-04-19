
import { AskforOrderVc, AskforOrderCo } from '@/services/index.js'
import { linkTo } from '@/utils/index.js'

import store from '@/store/index.js'

export default {
  store,
  components: { },
  data() {
    return {
      siteName: mpvue.getStorageSync('siteName'),
      orderList: [],
      payChannel: [],
      cardId: '',
      card: '',
      cardAmount: 0,
      disId: '',
      defaultDis: '',
      discountAmount: 0,
      preAmount: 0,
      promotionAmount: 0,
      orderSum: 0,
      channelType: 1 // 支付方式
    }
  },
  computed: {
    formatDate() {
      const now = new Date()
      const y = now.getFullYear()
      let m = now.getMonth()
      let d = now.getDate()

      m = '' + m
      m.length < 2 ? '0' + m : m
      d = '' + d
      d.length < 2 ? '0' + d : d

      return y + m + d
    }
  },
  onShow() {
    this._AskforOrderVc()
  },
  methods: {
    _AskforOrderVc() {
      const token = mpvue.getStorageSync('token')
      const customerId = mpvue.getStorageSync('customerId')
      const siteId = mpvue.getStorageSync('siteId')
      const goodsList = mpvue.getStorageSync('order_des')
      const disId = ''
      new AskforOrderVc({
        body: {
          token, customerId, siteId, goodsList, disId
        }
      }).send().then((res) => {
        console.log(res)
        this.orderList = res.orderList
        this.preAmount = res.preAmount
        this.promotionAmount = res.promotionAmount
      })
    },
    pay() {
      const token = mpvue.getStorageSync('token')
      const customerId = mpvue.getStorageSync('customerId')
      const siteId = mpvue.getStorageSync('siteId')
      const goodsList = mpvue.getStorageSync('order_des')
      const disId = this.disId
      const cardId = this.cardId
      const channelType = this.channelType
      new AskforOrderCo({
        body: {
          token, customerId, siteId, disId, cardId, channelType, goodsList
        }
      }).send().then((res) => {
        const orderId = res.orderId
        linkTo('/pages/onlinePayment/main?orderId=' + orderId + '&channelType=' + this.channelType)
      }, (err) => {
        console.log(err)
      })
    }
  }
}
