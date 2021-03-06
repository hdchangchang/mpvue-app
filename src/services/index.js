
import fetch from '@/utils/fetch.js'

const baseUrl = 'https://tapi.51chifanfan.com/'

// class
class AskforRequest {
  constructor(options) {
    // this.url = url
    this.options = options
  }
  send() {
    return new Promise((resolve, reject) => {
      if (!this.url) {
        return false
      }
      fetch(this.url, this.options).then((res) => {
        resolve(res.data)
      }, (err) => {
        reject(err)
      })
    })
  }
}

// 发送code到后台
export class SendCode extends AskforRequest {
  constructor(option) {
    super(option)
    this.url = baseUrl + 'ma/user/auth'
  }
}

/**
 * 获取点位列表
 */
export class AskforSiteList extends AskforRequest {
  constructor(option) {
    super(option)
    this.url = baseUrl + 'mansion/site'
  }
}

/**
 * 获取banner列表
 */
export class AskforBannerList extends AskforRequest {
  constructor(option) {
    super(option)
    this.url = baseUrl + 'banner/list'
  }
}

/**
 * 获取配餐日期
 */
export class AskforPlanList extends AskforRequest {
  constructor(option) {
    super(option)
    this.url = baseUrl + 'goods/plan'
  }
}

/**
 * 获取某日配餐数据
 */
export class AskforGoodsList extends AskforRequest {
  constructor(option) {
    super(option)
    this.url = baseUrl + 'goods/list'
  }
}

/**
 * 获取商品详情
 */
export class AskforGoodsDetail extends AskforRequest {
  constructor(option) {
    super(option)
    this.url = baseUrl + 'goods/detail'
  }
}

/**
 * 获取验证码
 */
export class AskforYzm extends AskforRequest {
  constructor(option) {
    super(option)
    this.url = baseUrl + 'sms/send'
  }
}

/**
 * 登录
 */
export class Askforlogin extends AskforRequest {
  constructor(option) {
    super(option)
    this.url = baseUrl + 'ma/user/login'
  }
}

/**
 * 添加购物车
 */

export class AskforAddCart extends AskforRequest {
  constructor(option) {
    super(option)
    this.url = baseUrl + 'cart/add'
  }
}

/**
 * 改变购物车
 */
export class AskforSumCart extends AskforRequest {
  constructor(option) {
    super(option)
    this.url = baseUrl + 'cart/sum'
  }
}

/**
 * 获取购物车数据
 */
export class AskforCartList extends AskforRequest {
  constructor(option) {
    super(option)
    this.url = baseUrl + 'cart/list'
  }
}

/**
 * 获取待取餐数量
 */
export class AskforTakeSum extends AskforRequest {
  constructor(option) {
    super(option)
    this.url = baseUrl + 'customer/takeSum'
  }
}

/**
 * 获取订单
 */
export class AskforOrderList extends AskforRequest {
  constructor(option) {
    super(option)
    this.url = baseUrl + 'order/list'
  }
}

/**
 * 获取用户信息
 */

export class AskforUserInfo extends AskforRequest {
  constructor(option) {
    super(option)
    this.url = baseUrl + 'customer/index'
  }
}

/**
 * 获取订单详情
 */
export class AskforOrderDetail extends AskforRequest {
  constructor(option) {
    super(Object.assign({
      header: { 'content-type': 'application/json;charset=UTF-8' },
      method: 'POST'
    }, option))
    this.url = baseUrl + 'order/takeDetail'
  }
}

/**
 * 验证用户登录信息
 */
export class AskforCustomerVl extends AskforRequest {
  constructor(option) {
    super(Object.assign({
      method: 'POST'
    }, option))
    this.url = baseUrl + 'customer/vl'
  }
}

/**
 * 获取下单信息
 */
export class AskforOrderVc extends AskforRequest {
  constructor(option) {
    super(Object.assign({
      method: 'POST'
    }, option))
    this.url = baseUrl + 'order/vc'
  }
}

/**
 * 立即下单
 */

export class AskforOrderCo extends AskforRequest {
  constructor(option) {
    super(Object.assign({
      method: 'POST'
    }, option))
    this.url = baseUrl + 'order/co'
  }
}

/**
 * payingInfo
 */

export class AskforPayingInfo extends AskforRequest {
  constructor(option) {
    super(Object.assign({
      method: 'POST'
    }, option))
    this.url = baseUrl + 'order/payingInfo'
  }
}

/**
 * 余额支付
 */
export class AskforOrderBp extends AskforRequest {
  constructor(option) {
    super(Object.assign({
      method: 'POST'
    }, option))
    this.url = baseUrl + 'order/bp'
  }
}
