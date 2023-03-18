const mysql = require('../db/mysql');

//TODO 需要对个人活动管理 学校活动管理 编辑功能 添加数据验证 新增对用户上传文件进行修改

//获取数据
exports.getIndividualList = (req, res) => {
    let requestParams = req.query.data;
    let pageNum = (requestParams.pageNum - 1) * 5;
    let pageSize = Number(requestParams.pageSize);
    let query = '%' + requestParams.query + '%'

    let connection = mysql.createConnection();
    let sql2 = 'select count(1) from all_events where type="personal"';
    let total;
    connection.connect();
    connection.query(sql2, (err, results) => {
        if (err) return console.log(err);
        let i = JSON.stringify(results[0]).slice(12);
        total = i.substr(0, i.length - 1);
    })

    let sql = 'select id,eventsname,uname,email,address,starttime,shuttime,file from all_events where type="personal" and eventsname like ? limit ?,?';
    connection.query(sql, [query, pageNum, pageSize], (err, results) => {
        if (err) return console.log(err);
        res.send({ status: 200, data: results, total: total });
    })
    connection.end();
}

//删除数据
exports.removeEvents = (req, res) => {
    let id = req.body.id;
    let connection = mysql.createConnection();
    let sql = 'delete from all_events where id=?';
    connection.connect();
    connection.query(sql, id, (err, results) => {
        if (err) return console.log(err);
        if (results.affectedRows == 1) {
            res.send({ status: 200, message: '删除活动成功!' });
        }
    })
    connection.end();
}


//修改数据
exports.editEvents = (req, res) => {
    let newEventsValue = req.body.data;
    let connection = mysql.createConnection();
    let sql = 'update all_events set eventsname=?,uname=?,email=?,starttime=?,shuttime=?,address=? where id=?';
    connection.connect();
    connection.query(sql, [newEventsValue.eventsname, newEventsValue.uname, newEventsValue.uemail, newEventsValue.starttime, newEventsValue.shuttime, newEventsValue.address, newEventsValue.id], (err, results) => {
        if (err) return console.log(err);
        if (results.affectedRows == 1) {
            res.send({ status: 200, message: '修改数据成功!' });
        }
    })
    connection.end();
}