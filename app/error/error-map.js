/**
 * API错误名称
 */
let ApiErrorNames = {}

ApiErrorNames.UNKNOW_ERROR = 'unknowError'
ApiErrorNames.USER_NOT_EXIST = 'userNotExist'
ApiErrorNames.USERNAME_EXIST = 'userNameExist'

/**
 * API错误名称对应的错误信息
 */
const errorMap = new Map()

errorMap.set(ApiErrorNames.UNKNOW_ERROR, {code: -1, message: '未知错误'})
errorMap.set(ApiErrorNames.USER_NOT_EXIST, {code: 101, message: '用户不存在'})
errorMap.set(ApiErrorNames.USERNAME_EXIST, {code: 50000, message: '用户名已经存在'})

module.exports = {
  ApiErrorNames,
  errorMap
}