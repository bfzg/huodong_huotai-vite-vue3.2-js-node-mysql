const express = require('express');
const router = express.Router();

//导入用户路由处理函数对应的模块
const user_handler = require('../router_handler/user');
//导入验证数据的中间件
const expressJoi = require('@escook/express-joi');
//导入需要的验证规则
const {reg_login_schema} = require('../schema/user.js');

//用户登录
router.post('/login',expressJoi(reg_login_schema),user_handler.login);

module.exports = router;