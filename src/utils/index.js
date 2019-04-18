import CryptoJS from 'crypto-js/crypto-js'

export const formatNumber = function(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export const formatTime = function(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export const linkTo = function(url) {
  const switchList = ['/pages/index/main', '/pages/cart/main', '/pages/order/main', '/pages/mine/main']
  const isSwitch = switchList.some((itm) => {
    return itm == url
  })
  console.log(isSwitch)
  if (mpvuePlatform === 'wx' && isSwitch) {
    mpvue.switchTab({ url })
  } else {
    mpvue.navigateTo({ url })
  }
}

export const getQuery = function() {
  /* 获取当前路由栈数组 */
  const pages = getCurrentPages() // mpvue 是否实现？还是只是小程序方法？
  const currentPage = pages[pages.length - 1]
  const options = currentPage.options
  return options
}

export const encryptByDES = function(message, key) {
  var keyHex = CryptoJS.enc.Utf8.parse(key)
  var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}
