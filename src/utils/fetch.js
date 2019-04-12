
/**
 * 封装request请求
 * @param {*} url
 * @param {*} options
 */
const fetch = function(url, options = {}) {
  const { method = 'GET', body = {}, showError = true } = options

  return new Promise((resolve, reject) => {
    mpvue.request({
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method,
      url,
      data: body,
      success: res => {
        if (showError) {
          if (res.statusCode < 200 || res.statusCode > 300) {
            return reject(res.data || {})
          }
          if (Number(res.data.result) !== 200) {
            return reject(res.data || {})
          }
        }
        return resolve(res.data || {})
      },
      complete: res => {
        // TODO:
      }
    })
  })
}

export default fetch
