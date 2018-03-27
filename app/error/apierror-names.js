let {ApiErrorNames, errorMap} = require('./error-map')

// 根据错误名称获取错误信息
ApiErrorNames.getErrorInfo = (errorName) => {
  let errorInfo

  if (errorName) {
    errorInfo = errorMap.get(errorName)
  }

  // 如果没有对应的错误信息，默认'未知错误'
  if (!errorInfo) {
    errorName = ApiErrorNames.UNKNOW_ERROR
    errorInfo = errorMap.get(errorName)
  }

  return errorInfo
}

module.exports = ApiErrorNames