const router = require('koa-router')()
const accountController = require('../../app/controllers/account-controller')

router.prefix('/api')

router.get('/', function (ctx, next) {
  console.log(router)
  ctx.body = 'this is a accounts response!'
})

// 列表
router.post('/account/getList', accountController.getAccountList)

module.exports = router