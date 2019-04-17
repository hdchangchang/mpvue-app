
import { AskforUserInfo } from '@/services/index.js'

import store from '@/store/index.js'
import tabBar from '@/components/tabBar.vue'

export default {
  store,
  components: { tabBar },
  data() {
    return {
      userInfo: {}
    }
  },
  onShow() {
    this._AskforUserInfo()
  },
  methods: {
    _AskforUserInfo() {
      const token = mpvue.getStorageSync('token')
      const customerId = mpvue.getStorageSync('customerId')

      new AskforUserInfo({
        method: 'POST',
        body: {
          token,
          customerId
        }
      }).send().then((res) => {
        this.userInfo = res
      })
    }
  }
}
