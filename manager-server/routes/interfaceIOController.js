var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/mysql.js'); 
//搜索功能
router.post("/search",function(req,res,next){
    var serviceNum=req.body.int_service_num;
    var searchSql="select * from int_io_params where int_service_num="+serviceNum;
    db.query(searchSql,function(err,rows){
        if(err){
            console.log("修改失败！"+err);
        }
        else{
            console.log(rows);
        }
    })
});
module.exports = router;
