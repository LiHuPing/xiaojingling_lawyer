// 查询字符串方法
function toQueryString (obj) {
  return obj ? Object.keys(obj).sort().map(function (key) {
    var val = obj[key]
    if (Array.isArray(val)) {
      return val.sort().map(function (val2) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(val2)
      }).join('&')
    }
    return encodeURIComponent(key) + '=' + encodeURIComponent(val)
  }).join('&') : ''
}

export { toQueryString }