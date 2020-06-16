const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String
    },
    avatar: {
        type: String
    },
    banner: {
        type: String
    },
    title: {
        type: String
    },
    categories: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category'
    }],
    // 技能难度
    scores: {
        difficult: {
            type: Number
        },
        skills: {
            type: Number
        },
        attack: {
            type: Number
        },
        survive: {
            type: Number
        },
    },
    // 技能
    skills: [{
        icon: {
            type: String
        },
        name: {
            type: String
        },
        delay: {
            type: String
        },
        cost: {
            type: String
        },
        description: {
            type: String
        },
        tips: {
            type: String
        }
    }],
    // 顺风出装
    items1: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Item'
    }],
    // 逆风出装
    items2: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Item'
    }],
    // 使用技巧
    usageTips: {
        type: String
    },
    // 对抗技巧
    battleTips: {
        type: String
    },
    // 团战思路
    teamTips: {
        type: String
    },
    // 英雄关系
    partners: [{
        hero: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Hero'
        },
        description: {
            type: String
        }
    }]
})

module.exports = mongoose.model('Hero', schema, 'heroes')