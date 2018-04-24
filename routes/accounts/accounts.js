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
// 删除账户
router.post('/account/delAccount', accountController.delAccount)
// 更改密码
router.post('/account/changePassWord', accountController.changePassWord)
// 根据id获取信息
router.post('/account/getUsernameById', accountController.getUsernameById)

module.exports = router