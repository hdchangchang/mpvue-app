import {
  AskforCartList,
  AskforSumCart
} from '@/services/index.js'

import store from '@/store/index.js'
import tabBar from '@/components/tabBar.vue'
import iNumber from '@/components/common/iNumber.vue'

export default {
  store,
  components: {
    tabBar,
    iNumber
  },
  data() {
    return {
      ce: { data: 1, list: [{ data: 1 }] },
      siteName: '',
      goods: [], // 购物车列表
      checkAll: true, // 是否全选
      totalPrice: 0, // 合计
      totalReduce: 0 // 合计减免
    }
  },
  onShow() {
    this._AskforCartList()
  },
  mounted() {
    this.siteName = mpvue.getStorageSync('siteName')
  },
  watch: {
    goods: {
      handler() {
        this.makeAccounts()
      },
      deep: true
    }
  },
  methods: {
    clickCheckItm(itm, item) {
      let checkLen = 0
      let checkModuleLen = 0
      itm.check = !itm.check
      item.goods.forEach((it, id) => {
        if (it.check) {
          checkLen++
        }
      })
      if (checkLen == 0) {
        item.check = false
      }
      if (checkLen == item.goods.length) {
        item.check = true
      }

      this.goods.forEach((it, id) => {
        if (it.check) {
          checkModuleLen++
        }
      })
      if (checkModuleLen == 0) {
        this.checkAll = false
      }
      if (checkModuleLen == this.goods.length) {
        this.checkAll = true
      }
      this.makeAccounts()
    },
    clickCheckModule(item) {
      item.check = !item.check
      let checkModuleLen = 0
      const check = item.check
      item.goods.forEach((itm) => {
        itm.check = check
      })

      this.goods.forEach((it, id) => {
        if (it.check) {
          checkModuleLen++
        }
      })
      if (checkModuleLen == 0) {
        this.checkAll = false
      }
      if (checkModuleLen == this.goods.length) {
        this.checkAll = true
      }
    },
    clickCheckAll() {
      this.checkAll = !this.checkAll
      const goods = this.goods
      // 初始化check
      goods.forEach((item, index) => {
        item.check = this.checkAll
        item.goods.forEach((itm, idx) => {
          itm.check = this.checkAll
        })
      })
      this.goods = goods
    },
    makeAccounts() {
      this.totalPrice = 0
      this.totalReduce = 0
      this.goods.forEach((item, index) => {
        item.goods.forEach((itm, idx) => {
          if (itm.check) {
            this.totalPrice += Number(itm.prePrice)
            this.totalReduce += (Number(itm.goodsMoney) - Number(itm.prePrice))
          }
        })
      })
    },
    // change购物车数量
    changeHandle(itm) {
      const token = mpvue.getStorageSync('token')
      const customerId = mpvue.getStorageSync('customerId')
      const vmId = mpvue.getStorageSync('siteId')
      const {
        id,
        goodsId,
        goodsName,
        goodsSmall,
        goodsMoney,
        prePrice,
        planDate,
        count
      } = itm
      new AskforSumCart({
        method: 'POST',
        body: {
          token,
          vmId,
          customerId,
          id,
          goodsId,
          goodsName,
          goodsSmall,
          goodsMoney,
          prePrice,
          planDate,
          count // 添加数量
        }
      }).send().then((res) => {})
    },
    _AskforCartList() {
      const vmId = mpvue.getStorageSync('siteId')
      const customerId = mpvue.getStorageSync('customerId')
      const token = mpvue.getStorageSync('token')
      if (!vmId || !customerId || !token) return false
      new AskforCartList({
        body: {
          vmId,
          customerId,
          token
        }
      }).send().then((res) => {
        const goods = res.goods
        // 初始化check
        goods.forEach((item, index) => {
          item.check = true
          item.goods.forEach((itm, idx) => {
            itm.check = true
          })
        })
        this.goods = goods
      })
    }
  }
}
