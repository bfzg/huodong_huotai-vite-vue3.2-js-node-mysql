//导入数据库
const mysql = require('../db/mysql');
//生成token
const {generateToken}  = require('../schema/token/authorization');

//登录处理函数
exports.login = (req,res)=>{
    //接收表单数据
    const userinfo = req.body;
    let sql = 'select * from admin_grade where name=? and password=?';
    let connection = mysql.createConnection();
    connection.connect();
    connection.query(sql,[userinfo.username,userinfo.password],(err,results)=>{
        if(err) return console.log(err);
        if(results != ''){
            let user_data = results;
            //转义json
            let list = JSON.parse(user_data[0].view_list);
            const name = user_data[0].name;
            const password = user_data[0].password;
            const token = generateToken({name,password});
            //需要返回的数据
            let res_userInfo = {
                id:user_data[0].id,
                name:user_data[0].name,
                grade:user_data[0].grade,
                view_list:list,
                token:token
            }
            return res.send({status:200,message:'登录成功!',res_userInfo});
        }else{
            return res.send({status:201,message:'用户名或密码错误!'});
        }
    })
    connection.end();
}