// 请求服务器地址
const serverPath = 'http://www.shopnc.com'
// const serverPath = 'http://shop.xunshi.com'
const apiBase = serverPath + '/mobile/index.php'

String.prototype.startWith = function (str) {
  var reg = new RegExp('^' + str)
  return reg.test(this)
}
String.prototype.endWith = function (str) {
  var reg = new RegExp(str + '$')
  return reg.test(this)
}

function getUrl(url) {
  if (url.startWith('http://') || url.startWith('https://')) {
    return url
  } else {
    return apiBase + url
  }
}

let nullFn = () => {
}
function IllegalAPIException(name) {
  this.message = "No Such API [" + name + "]"
  this.name = 'IllegalAPIException'
}
let services = {
  sleep: (time) => {
    return new Promise(function (resolve, reject) {
      setTimeout(resolve, time)
    })
  },
  stop: () => {
    return new Promise(function (resolve, reject) {
    })
  },
  taskSequence: () => {
    return new Promise(function (resolve, reject) {
      resolve()
    })
  },
  // GET请求
  get: (url, data) => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: getUrl(url),
        data,
        method: 'GET',
        dataType: 'json',
        success: function (res) {
          resolve(res.data)
        },
        fail: reject
      })
    })
  },
  // POST请求
  post: (url, data) => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: getUrl(url),
        data,
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: 'POST',
        dataType: 'json',
        success: function(res) {
          resolve(res.data)
        },
        fail: reject
      })
    })
  },
  // 上传文件
  upload: (url, filePath, name = 'file', formData = {}) => {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: getUrl(url),
        filePath: filePath,
        name: name,
        formData: formData,
        success: function (res) {
          resolve(JSON.parse(res.data))
        },
        fail: function (res) {
          reject(res)
        }
      })
    })
  },
  // 下载文件
  download: (url) => {
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url: getUrl(url),
        success: resolve,
        fail: reject
      })
    })
  }
}

let wsAPI = new Proxy(services, {
  get: function (target, property) {
    if (property in target) {
      return target[property]
    } else if (property in wx) {
      return (obj) => {
        return new Promise(function (resolve, reject) {
          obj = obj || {}
          obj.success = (...args) => {
            resolve(...args)
          }
          obj.fail = (...args) => {
            reject(...args)
          }
          obj.complete = nullFn
          wx[property](obj)
        })
      }
    } else {
      throw new IllegalAPIException(property)
    }
  }
})
export let apiBaseUrl =  apiBase;
export default wsAPI