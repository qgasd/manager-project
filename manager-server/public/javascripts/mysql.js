//mysql数据库连接池工具类
var mysql=require("mysql");  
var pool = mysql.createPool({  
    host: '172.21.21.210',  
    user: 'root',  
    password: '123456',  
    database: 'manager',  
    port: 3306  
});  
function query(sql, callback) {
    pool.getConnection(function (err, connection) {
        // 使用连接
        connection.query(sql, function (err, rows) {
            callback(err, rows);
            connection.release();//释放链接
        });
    });
}
exports.query = query;