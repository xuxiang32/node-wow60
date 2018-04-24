const ApiError = require('../error/api-error')
const ApiErrorNames = require('../error/apierror-names')
const {
  query
} = require('../../config/async-db-realm')
// 获取账户列表
exports.getAccountList = async (ctx, next) => {
  let sql = 'SELECT id,username,joindate,last_ip,last_login,locale,os FROM account where id not in (1,2,3,4)'
  let dataList = await query(sql)
  if (dataList.length > 0) {
    ctx.body = dataList
  } else {
    throw new ApiError(ApiErrorNames.UNKNOW_ERROR)
  }
}
// 添加账户
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
      ctx.body = {
        status: 'OK'
      }
    } else {
      throw new ApiError(ApiErrorNames.UNKNOW_ERROR)
    }
  }
}

// 删除账户
exports.delAccount = async (ctx, next) => {
  let delSql = 'delete from account where id = ' + ctx.request.body.id;
  let body = await query(delSql);
  if (body.protocol41) {
    ctx.body = {
      status: 'OK'
    }
  } else {
    throw new ApiError(ApiErrorNames.UNKNOW_ERROR)
  }
}
// 根据id获取信息
exports.getUsernameById = async (ctx, next) => {
  let sql = 'SELECT username FROM account where id = ' + ctx.request.body.id;
  console.log(sql);
  let dataList = await query(sql)
  if (dataList.length > 0) {
    ctx.body = dataList
  } else {
    throw new ApiError(ApiErrorNames.UNKNOW_ERROR)
  }
}

// 更改密码
exports.changePassWord = async (ctx, next) => {
  let updSql = "UPDATE account SET sha_pass_hash = SHA1(CONCAT(UPPER('" +
    ctx.request.body.username + "'),':',UPPER('" +
    ctx.request.body.password + "'))) WHERE username = '" +
    ctx.request.body.username + "'";
  let body = await query(updSql)
  if (body.protocol41) {
    ctx.body = {
      status: 'OK'
    }
  } else {
    throw new ApiError(ApiErrorNames.UNKNOW_ERROR)
  }
}