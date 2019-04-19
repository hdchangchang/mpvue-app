
import { } from '@/services/index.js'

import store from '@/store/index.js'
import keyBoard from '@/components/common/keyBoard.vue'

export default {
  store,
  components: {
    keyBoard
  },
  data() {
    return {
      password:''
    }
  }
}
