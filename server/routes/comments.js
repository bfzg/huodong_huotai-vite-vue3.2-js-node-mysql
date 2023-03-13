const express = require('express');
const router = express.Router();

//处理模块
const comments_handler = require('../router_handler/comments');
//获取数据
router.get('/comments/getDataList',comments_handler.getDataList);
//删除数据
router.delete('/comments/removeComment',comments_handler.removeComment)
module.exports = router;