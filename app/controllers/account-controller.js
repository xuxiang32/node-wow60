const ApiError = require('../error/api-error')
const ApiErrorNames = require('../error/apierror-names')
// 获取账户列表
exports.getAccountList = async (ctx, next) => {
  if (ctx.query.id !== 1) {
    throw new ApiError(ApiErrorNames.USER_NOT_EXIST)
  }
  ctx.body = {
    username: '阿，希爸',
    age: 30
  }
  // console.log(ctx)
}

exports.addAccount = async (ctx, next) => {
  console.log('registerUser', ctx.request.body)
}