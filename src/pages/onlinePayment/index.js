import {
  AskforPayingInfo,
  AskforOrderBp
} from '@/services/index.js'
import {
  linkTo
} from '@/utils/index.js'

import store from '@/store/index.js'
import keyBoard from '@/components/common/keyBoard.vue'

export default {
  store,
  components: {
    keyBoard
  },
  data() {
    return {
      orderId: '',
      channelType: '', // 支付方式
      preAmount: 0,
      isPwd: 0, // 余额支付 是否免密 0:免密 1:需要输入密码
      password: ''
    }
  },
  onShow() {
    this.password = ''
    this.$bus.emit('hideKeyBoard')
  },
  mounted() {
    const {
      orderId,
      channelType
    } = this.$root.$mp.query
    this.orderId = orderId
    this.channelType = channelType

    this.getPayInfo()
  },
  watch: {
    password(v) {
      if (v.length == 6) {
        const token = mpvue.getStorageSync('token')
        const customerId = mpvue.getStorageSync('customerId')
        const orderId = this.orderId
        const password = this.password
        new AskforOrderBp({
          body: {
            customerId,
            token,
            orderId,
            password
          }
        }).send().then((res) => {
          console.log(res)
          linkTo('/pages/order/main')
        }, (err) => {
          console.log(err)
        })
      }
    }
  },
  methods: {
    getPayInfo() {
      const token = mpvue.getStorageSync('token')
      const customerId = mpvue.getStorageSync('customerId')
      const orderId = this.orderId
      new AskforPayingInfo({
        body: {
          customerId,
          token,
          orderId
        }
      }).send().then((res) => {
        this.isPwd = res.isPwd
        this.preAmount = res.preAmount
        console.log(res)
      })
    },
    pay() {
      // 余额支付
      if (this.channelType == 1) {
        this.payBp()
      }
      // 微信支付
      if (this.channelType == 2) {
        this.payWx()
      }
    },
    payBp() {
      const token = mpvue.getStorageSync('token')
      const customerId = mpvue.getStorageSync('customerId')
      const orderId = this.orderId
      const password = this.password

      if (this.isPwd) {
        console.log('showKeyBoard')
        this.$bus.emit('showKeyBoard')
      } else {
        new AskforOrderBp({
          body: {
            customerId,
            token,
            orderId,
            password
          }
        }).send().then((res) => {
          console.log(res)
          linkTo('/pages/order/main')
        })
      }
    },
    payWx() {}
  }

}
