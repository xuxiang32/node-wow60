const router = require('koa-router')()
const accountController = require('../../app/controllers/account-controller')

router.prefix('/api')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a accounts response!'
})

// 用户路由
// 获取用户列表
router.post('/account/getList', accountController.getAccountList)
// 添加用户
router.post('/account/addAccount', accountController.addAccount)

module.exports = router