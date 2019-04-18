
import { AskforOrderDetail } from '@/services/index.js'
import { linkTo } from '@/utils/index.js'

import store from '@/store/index.js'

export default {
  store,
  components: { },
  data() {
    return {
      orderId: '',
      orderList: [],
      orderSum: '',
      preAmount: '',
      payTime: '',
      siteName: '',
      orderStatus: ''
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
    this.orderId = this.$root.$mp.query.orderId
    this.getOrderDetail()
  },
  methods: {
    getOrderDetail() {
      const orderId = this.orderId
      new AskforOrderDetail({
        body: {
          orderId
        }
      }).send().then((res) => {
        console.log(res.orderStatus)
        this.siteName = res.siteInfo.siteName
        this.orderList = res.orderList
        this.orderSum = res.orderSum
        this.preAmount = res.preAmount
        this.orderStatus = res.orderStatus
        this.payTime = res.payTime
      })
    }
  }
}
