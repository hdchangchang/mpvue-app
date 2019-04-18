
/**
 * 封装request请求
 * @param {*} url
 * @param {*} options
 */
const fetch = function(url, options = {}) {
  const {
    header = { 'content-type': 'application/x-www-form-urlencoded' },
    method = 'GET',
    body = {}
  } = options

  return new Promise((resolve, reject) => {
    mpvue.request({
      header,
      method,
      url,
      data: body,
      success: res => {
        if (Number(res.data.result) !== 200) {
          reject(res.data || {})
          return false
        }
        resolve(res.data || {})
      },
      complete: res => {
        // TODO:
      }
    })
  })
}

export default fetch
