const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String,
        // 散列 不可逆的密码（保护用户隐私） npm i bcryptjs
        select: false, // 散列之后的密码不会被当做密码保存
        set(val) {
            // 指数越高越安全但是加载时间也更长
            return require('bcryptjs').hashSync(val, 10)
        }
    },
})

module.exports = mongoose.model('AdminUser', schema)