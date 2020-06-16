module.exports = options => {
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../models/AdminUser')
    const assert = require('http-assert')

    return async (req, res, next) => {
        // const token = req.headers.authorization
        // console.log(token)
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token, 401, '请先登录')
        const {
            id
        } = jwt.verify(token, req.app.get('secret')) // 中间件中是访问不到路由里的app 这里需要req.app
        assert(id, 401, '请先登录')
        req.user = await AdminUser.findById(id)
        // console.log(req.user)
        assert(req.user, 401, '请先登录')

        await next()
    }
}