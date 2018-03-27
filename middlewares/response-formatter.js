const ApiError = require('../app/error/api-error')
/**
 * 在app.use(router)之前调用
 */
const response_formatter = async (ctx, next) => {
  // 如果有返回数据，将返回数据添加到data中
  if (ctx.body) {
    console.log(ctx.response)
    ctx.body = {
      header: {
        code: 20000,
        message: 'success'
      },
      body: ctx.body
    }
  } else {
    ctx.body = {
      header: {
        code: 50000,
        message: '内部接口错误'
      },
      body: null
    }
  }
}
const url_filter = function (pattern) {

  return async function (ctx, next) {
    let reg = new RegExp(pattern)
    try {
      // 先去执行路由
      await next()
    } catch (error) {
      if (error instanceof ApiError && reg.test(ctx.originalUrl)) {
        ctx.status = 50000;
        ctx.body = {
          header: {
            code: error.code,
            message: error.message
          },
          body: {
            data: ctx.body
          }
        }
      }
      // 继续抛，让外层中间件处理日志
      throw error;
    }
    // 通过正则的url进行格式化处理
    if (reg.test(ctx.originalUrl)) {
      response_formatter(ctx)
    }
  }
}

module.exports = url_filter