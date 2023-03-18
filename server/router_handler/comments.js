const mysql = require('../db/mysql')

//获取数据
exports.getDataList = (req,res)=>{
    let requestParams = req.query.data;
    let pageNum = (requestParams.pageNum - 1) * 5;
    let pageSize = Number(requestParams.pageSize);
    let query = '%'+requestParams.query+'%'
    let connection = mysql.createConnection();
    let sql = 'select * from dynamic where uname like ? limit ?,?'
    let sql2 = 'select count(1) from dynamic'
    let total;
    connection.connect();
    connection.query(sql2,(err,results)=>{
        if(err) return console.log(err);
        let i = JSON.stringify(results[0]).slice(12);
        total = i.substr(0,i.length-1);
    })

    connection.query(sql,[query,pageNum,pageSize],(err, results) => {
        if (err) return console.log(err);
         /* 对数据经行处理 */
         const result =[];
         const map = {};
         results.forEach(item=>{
             map[item.id] = item;
             item.img = JSON.parse(item.img)   //解除json
         });
         results.forEach(item=>{
             const parent = map[item.pid];
             if(parent){
                 (parent.children || (parent.children=[])).unshift(item)
             }else {
                 result.unshift(item);
             }
         })
         /* end 对数据经行处理 */
        res.send({ status: 200, data: results ,total:total});
    })
    connection.end();
}

//删除数据
exports.removeComment = (req,res)=>{
    let removeData = req.body.data.substr(0, req.body.data.length - 1); //去除最后一个逗号
    let connection = mysql.createConnection();
    let sql = `DELETE FROM dynamic WHERE id in (${removeData})`;
    connection.connect();
    connection.query(sql,(err,results)=>{
        if(err) return console.log(err);
        res.send({status:200,message:'删除成功!'});
    })
    connection.end();
}