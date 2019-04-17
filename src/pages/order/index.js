
import { AskforOrderList } from '@/services/index.js'
import { linkTo } from '@/utils/index.js'

import store from '@/store/index.js'
import tabBar from '@/components/tabBar.vue'

export default {
  store,
  components: { tabBar },
  data() {
    return {
      type: 'wait', // 待取餐 wait , 所有订单 all
      showList: [],
      orderList: [], // 全部订单
      waitList: [], // 待取餐订单
      page: 1,
      size: 20
    }
  },
  watch: {
    type: {
      handler(v) {
        if (v == 'wait') {
          this.showList = this.waitList
        } else {
          this.showList = this.orderList
        }
      }
    }
  },
  mounted() {
    this._AskforOrderList()
  },
  methods: {
    toOrderDetail(item) {
      linkTo('/pages/orderDetail/main?orderId=' + item.orderId)
    },
    changeType(type) {
      this.type = type
    },
    _AskforOrderList() {
      const token = mpvue.getStorageSync('token')
      const customerId = mpvue.getStorageSync('customerId')
      new AskforOrderList(
        {
          body: {
            token,
            customerId,
            page: this.page,
            size: this.size
          }
        }
      ).send().then((res) => {
        const orderList = res.data
        this.orderList = orderList
        this.waitList = orderList.filter((item, index) => {
          return item.status == 300
        })
        this.showList = this.waitList
      })
    }
  }
}
