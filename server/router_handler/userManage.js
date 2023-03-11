const mysql = require("../db/mysql");

//查询所有用户信息
exports.getUserInfo = (req,res)=>{
    let queryParams = req.query.data;
    let pageNum = Number(queryParams.pageNum)-1;
    let pageSize = Number(queryParams.pageSize);
    let query = '%'+queryParams.query+'%';
    let sql;
    let connection = mysql.createConnection();
    let total;
    if(queryParams.query == ''){
        sql = 'select uid,uemail,uname,uip,utime from user limit ?,?';
        let sql2 = 'select * from user';
       
        connection.query(sql2,(err,results)=>{
            if(err) return console.log(err);
            total = results.length;
        })

        connection.query(sql,[pageNum,pageSize],(err,results)=>{
            if(err) return console.log(err);
            res.send({status:200,data:results,total:total});
        })
        connection.end();
        return;
    }else{
        sql = 'select uid,uemail,uname,uip,utime from user where uname like ? limit ?,?';
        let sql2 = 'select * from user';
       
        connection.query(sql2,(err,results)=>{
            if(err) return console.log(err);
            total = results.length;
        })
        connection.query(sql,[query,pageNum,pageSize],(err,results)=>{
            if(err) return console.log(err);
            res.send({status:200,data:results,total:total});
        })
        connection.end();
        return;
    }
}

//删除用户信息
exports.removeUser = (req,res)=>{
    let uid = req.body.uid;
    let connection = mysql.createConnection();
    let sql = 'delete from user where uid=?';
    connection.query(sql,uid,(err,results)=>{
        if(err) console.log(err);
        if(results.affectedRows == 1){
            res.send({status:200,message:'删除成功!'});
        }
        return;
    })
    connection.end();
}

//修改用户信息

exports.editUserInfo = (req,res)=>{
    console.log(req.body);
    let userInfo = req.body;
    let connection = mysql.createConnection();
    let sql = 'update user set uname=?,uemail=? where uid=?';
    connection.query(sql,[userInfo.uname,userInfo.uemail,userInfo.uid],(err,results)=>{
        if(err) return console.log(err);
        if(results.affectedRows == 1){
            res.send({status:200,message:'修改成功!'});
        }
    })
    connection.end();
}