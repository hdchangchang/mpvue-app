import store from '@/store/index.js'
import pop from '@/components/common/pop.vue'
import login from '@/components/login.vue'

import iNumber from '@/components/common/iNumber.vue'

import {
  AskforGoodsDetail,
  AskforCartList,
  AskforAddCart,
  AskforCustomerVl
} from '@/services/index.js'

import {
  linkTo,
  encryptByDES
} from '@/utils/index.js'

export default {
  components: { pop, login, iNumber },
  store,
  data() {
    return {
      id: '',
      goodsId: '',
      goodsHead: '',
      goodsName: '',
      goodsSmall: '',
      sellTime: '',
      sellTimeStr: '',
      goodsLabels: [], // 陈列标签
      prePrice: '',
      goodsMoney: '',
      goodsDetails: '',
      count: '', // 库存
      goodsStatus: '', // 当前商品状态
      chili: '', // 辣度
      num: 1, // 计数器数值
      cartTotalNum: 0
    }
  },
  created() {
  },
  onLoad() {
  },
  onShow() {
    this.init()
  },
  computed: {},
  watch: {},
  methods: {
    init() {
      this.goodsId = this.$root.$mp.query.goodsId // onLoad之后能获得此参数
      const token = mpvue.getStorageSync('token')
      this.getDetail()
      if (token) {
        this.getCartList()
      }
    },
    getDetail() {
      const {
        firstMealC,
        secondMealC,
        ratioC,
        labelC
      } = this.$store.state.labelColor

      new AskforGoodsDetail({ body: { planId: this.goodsId }}).send().then((res) => {
        this.id = res.plan.id
        this.goodsId = res.plan.goodsId
        this.goodsHead = res.plan.goods.goodsHead
        this.goodsName = res.plan.goods.goodsName
        this.goodsDetails = res.plan.goods.goodsDetails
        this.goodsSmall = res.plan.goods.goodsSmall
        this.sellTime = res.plan.businessTime.timeType
        this.sellTimeStr = res.plan.businessTime.sellTimeStr
        this.prePrice = res.plan.prePrice
        this.goodsMoney = res.plan.goodsMoney
        this.count = res.plan.count
        this.planDate = res.plan.planDate

        const ratio = res.plan.ratio
        const sellTimeStr = res.plan.businessTime.sellTimeStr

        const goodsLabel = res.plan.goods.goodsLabel.split('、')
        const goodsLabels = []
        this.chili = []
        let chili = []
        // 不辣：1 ; 一级辣：2 ...
        if (res.plan.goods.spicyType == '' || res.plan.goods.spicyType == 1) {
          this.chili = []
        } else {
          chili = Number(res.plan.goods.spicyType) - 1
          for (var i = 0; i < chili; i++) {
            this.chili.push(1)
          }
          for (var j = 0; j < 4 - chili; j++) {
            this.chili.push(0)
          }
        }

        if (sellTimeStr == '早餐') {
          goodsLabels.push({
            txt: sellTimeStr,
            color: firstMealC
          })
        } else if (sellTimeStr == '午餐') {
          goodsLabels.push({
            txt: sellTimeStr,
            color: secondMealC
          })
        }
        if (ratio !== 0) {
          goodsLabels.push({
            txt: ratio + '折',
            color: ratioC
          })
        }
        goodsLabel.forEach((itm, idx) => {
          if (!itm) return false
          goodsLabels.push({
            txt: itm,
            color: labelC
          })
        })
        this.goodsLabels = goodsLabels
      })
    },
    getCartList() {
      const vmId = mpvue.getStorageSync('siteId')
      const customerId = mpvue.getStorageSync('customerId')
      const token = mpvue.getStorageSync('token')

      if (!token || !vmId) {
        return false
      }
      new AskforCartList({ body: {
        vmId,
        customerId,
        token
      }}).send().then((res) => {
        this.cartTotalNum = res.totalNum
      })
    },
    addtoCart() {
      const token = mpvue.getStorageSync('token')
      const customerId = mpvue.getStorageSync('customerId')
      const vmId = mpvue.getStorageSync('siteId')
      const count = this.num
      const { id, goodsId, goodsName, goodsSmall, goodsMoney, prePrice, sellTime, sellTimeStr, planDate } = this
      if (!token) {
        this.$bus.emit('showPop', { popName: 'popLogin' })
        return false
      }
      //
      new AskforAddCart({
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
          sellTime,
          sellTimeStr,
          planDate,
          count // 添加数量
        }
      }).send().then((res) => {
        this.getCartList()
      })
    },
    buy() {
      const customerId = mpvue.getStorageSync('customerId')
      const token = mpvue.getStorageSync('token')
      const goodslist = [{
        id: this.id,
        sellTime: this.sellTime,
        count: 1
      }]
      new AskforCustomerVl({
        body: {
          customerId,
          token
        }
      }).send().then((res) => {
        // 校验登录成功
        var goodsListString = JSON.stringify(goodslist)
        var order_des = encryptByDES(goodsListString, token)
        mpvue.setStorageSync('order_des', order_des)

        linkTo('/pages/orderSure/main')
      }, (res) => {
        // 登录
        this.$bus.emit('showPop', {
          popName: 'popLogin'
        })
      })
    }
  }
}
