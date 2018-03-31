const ApiErrorNames = require('./apierror-names')
/**
 * 自定义Api异常
 */
class ApiError extends Error {
  // 构造方法
  constructor (errorName) {
    super()
    let errorInfo = ApiErrorNames.getErrorInfo(errorName);
    this.name = errorName;
    this.code = errorInfo.code;
    this.message = errorInfo.message;
  }
}

module.exports = ApiError