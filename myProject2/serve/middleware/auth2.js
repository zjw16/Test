module.exports = options => {
    return async (req, res, next) => {
        const modelName = require('inflection').classify(req.params.resourse) //小写复数转大写单数
        req.Model = require(`../models/${modelName}`)
        next()
    }
}