const express = require("express");
const router = express.Router();

//引入处理模块
const userManage = require("../router_handler/userManage");

router.get('/user/getUserInfo',userManage.getUserInfo);
router.delete('/user/deleteUser',userManage.removeUser);
router.put('/user/editUser',userManage.editUserInfo);

module.exports =  router;