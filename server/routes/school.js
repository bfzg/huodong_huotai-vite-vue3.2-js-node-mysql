const express = require('express');
const router = express.Router();

//处理模块
const school_handler = require('../router_handler/school');



//获取数据
router.get('/school/getEventsList',school_handler.getSchoolList);
//删除数据
router.delete('/school/deleteEvents',school_handler.removeEvents);
//修改数据
router.put('/school/editEvents',school_handler.editEvents)
module.exports = router;