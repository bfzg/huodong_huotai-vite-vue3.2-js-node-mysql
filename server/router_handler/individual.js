const mysql = require('../db/mysql');

//获取数据
exports.getIndividualList = (req,res) => {
   let connection = mysql.createConnection();
   let sql = 'select id,eventsname,uname,email,address,starttime,shuttime,file from all_events where type="personal"';
   connection.query(sql,(err,results)=>{
    if(err) return console.log(err);
    console.log(results);
    if(results != ''){
        res.send({status:200,data:results});
    }
   })
   connection.end();
}

//删除数据
exports.removeEvents = (req,res)=>{
    //TODO获取id 删除对应数据
    console.log(req.body);
    res.send('ok');
}