// const ApiError = require('../error/api-error')
// const ApiErrorNames = require('../error/apierror-names')
const {query} = require('../../config/async-db-realm')
// 获取账户列表
exports.getAccountList = async (ctx, next) => {
  let sql = 'SELECT id,username,joindate,last_ip,last_login,locale,os FROM account where id not in (1,2,3,4);'
  let dataList = await query(sql)
  console.log(dataList)
  ctx.body = dataList
  /* if (ctx.query.id !== 1) {
    throw new ApiError(ApiErrorNames.USER_NOT_EXIST)
  } */
  // console.log(ctx)
}

exports.addAccount = async (ctx, next) => {
  console.log('registerUser', ctx.request.body)
}