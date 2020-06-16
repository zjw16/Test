module.exports = app => {
    const express = require('express')
    // npm i jsonwebtoken
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../../models/AdminUser')
    const assert = require('http-assert')
    const router = express.Router({
        mergeParams: true //合并URL参数
    })
    // const Category = require('../../models/Category')

    // 增
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    // 改
    router.put('/:_id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params._id.substr(1, 24), req.body)
        res.send(model)
    })

    // 删
    router.delete('/:_id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params._id, req.body)
        res.send({
            success: true
        })
    })

    // 查
    router.get('/', async (req, res) => {
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(100)
        res.send(items)
    })
    router.get('/:_id', async (req, res) => {
        // console.log(req.params._id)
        // console.log(typeof (req.params._id))
        // console.log(typeof ('5ed325fb9e703b1a84486b80'))

        const model = await req.Model.findById(req.params._id.substr(1, 24))
        // const model = await req.Model.findById('5ed325fb9e703b1a84486b80')
        res.send(model)

    })


    // 登录校验中间件
    // const auth = async (req, res, next) => {
    //     // const token = req.headers.authorization
    //     // console.log(token)
    //     const token = String(req.headers.authorization || '').split(' ').pop()
    //     assert(token, 401, '请先登录')
    //     const {
    //         id
    //     } = jwt.verify(token, app.get('secret'))
    //     assert(id, 401, '请先登录')
    //     req.user = await AdminUser.findById(id)
    //     // console.log(req.user)
    //     assert(req.user, 401, '请先登录')

    //     await next()
    // }
    const auth = require('../../middleware/auth')

    // 上传中间件
    // const auth2 = async (req, res, next) => {
    //     const modelName = require('inflection').classify(req.params.resourse) //小写复数转大写单数
    //     req.Model = require(`../../models/${modelName}`)
    //     next()
    // }
    const auth2 = require('../../middleware/auth2')

    // 设定路由=> 用户是否存在 => 对应的模型是哪一个
    app.use('/admin/api/rest/:resourse', auth(), auth2(), router)


    const multer = require('multer')
    const upload = multer({
        dest: __dirname + '/../../uploads'
    })
    app.post('/admin/api/upload', auth(), upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })


    // 登录
    app.post('/admin/api/login', async (req, res) => {
        const {
            username,
            password
        } = req.body // 解构赋值

        // 根据用户名找用户  
        const user = await AdminUser.findOne({
            username: username
        }).select('+password') // +表示把password这个字段取出来
        // 校验用户
        assert(user, 422, '用户不存在')
        // if (!user) {
        //     // 设置状态码之后在请求 不会误以为是正常的200
        //     return res.status(422).send({
        //         message: '用户不存在'
        //     })
        // }

        // 校验密码
        const isValid = require('bcryptjs').compareSync(password, user.password)
        assert(isValid, 422, '密码错误')
        // if (!isValid) {
        //     return res.status(422).send({
        //         message: '密码错误'
        //     })
        // }
        // 返回token
        const token = jwt.sign({
            id: user._id,
        }, app.get('secret'))

        res.send({
            token
        })
    })

    // 错误处理函数
    app.use(async (err, req, res, next) => {
        // console.log(err)
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}