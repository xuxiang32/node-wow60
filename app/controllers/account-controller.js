const ApiError = require('../error/api-error')
const ApiErrorNames = require('../error/apierror-names')
const {query} = require('../../config/async-db-realm')
// 获取账户列表
exports.getAccountList = async (ctx, next) => {
  let sql = 'SELECT id,username,joindate,last_ip,last_login,locale,os FROM account where id not in (1,2,3,4);'
  let dataList = await query(sql)
  ctx.body = dataList
  /* if (ctx.query.id !== 1) {
    throw new ApiError(ApiErrorNames.USER_NOT_EXIST)
  } */
  // console.log(ctx)
}

exports.addAccount = async (ctx, next) => {
  let sql = "SELECT * FROM account where username = '" + ctx.request.body.username + "'";
  let userExitsList = await query(sql);
  if (userExitsList.length > 0) {
    // ctx.body = null
    throw new ApiError(ApiErrorNames.USERNAME_EXIST)
  } else {
    let insert = "INSERT INTO account (username,sha_pass_hash,gmlevel) VALUES ('" +
      ctx.request.body.username + "',SHA1(CONCAT(UPPER('" +
      ctx.request.body.password + "'),':',UPPER('" +
      ctx.request.body.password + "'))),0);"
    let body = await query(insert)
    if (body.protocol41) {
      ctx.body = {status: 'OK'}
    } else {
      throw new ApiError(ApiErrorNames.UNKNOW_ERROR)
    }
  }
}