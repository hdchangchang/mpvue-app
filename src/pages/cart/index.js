
import { AskforCartList } from '@/services/index.js'

import store from '@/store/index.js'
import tabBar from '@/components/tabBar.vue'
import iNumber from '@/components/common/iNumber.vue'

export default {
  store,
  components: { tabBar, iNumber },
  data() {
    return {
      num: 5, // 测试
      siteName: '',
      goods: [] // 购物车列表
    }
  },
  onShow() {
    this._AskforCartList()
  },
  mounted() {
    this.siteName = mpvue.getStorageSync('siteName')
  },
  methods: {
    _AskforCartList() {
      const vmId = mpvue.getStorageSync('siteId')
      const customerId = mpvue.getStorageSync('customerId')
      const token = mpvue.getStorageSync('token')
      if (!vmId || !customerId || !token) return false
      new AskforCartList({ body: {
        vmId,
        customerId,
        token
      }}).send().then((res) => {
        console.log(res)
        this.goods = res.goods
      })
    }
  }
}
