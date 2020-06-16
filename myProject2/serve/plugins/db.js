module.exports = app => {
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba', {
        useNewUrlParser: true,
        // useUnifiedTopology: true
    })

    // npm i require-all  把某一个文件夹下面的所有文件引用了一遍 当成一个函数使用 传递一个路径就可以了
    require('require-all')(__dirname + '/../models')

}