const express = require('express');
const router = express.Router();

//处理模块
const individual_handler = require('../router_handler/individual');

//获取数据
router.get('/individual/getList',individual_handler.getIndividualList);
//删除数据
router.delete('/individual/deleteEvents',individual_handler.removeEvents);
//编辑数据
router.put('/individual/editEvents',individual_handler.editEvents);
module.exports=router;