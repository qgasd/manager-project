var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/mysql.js'); 
//查询调用关系
router.get('/serach/:id',function(req,res,next){
    var id = req.params.id;
    console.log(id);
    var serachSql = "SELECT a.*,b.`invoke_int_service_num`,b.`state`,b.`valid_date`,b.`origin_type` FROM int_information a,int_invoke_relation b WHERE a.`int_service_num` = b.`int_service_num` AND b.`invoke_int_service_num`=" + id;
   db.query(serachSql,function(err,rows){
        if(err){
            console.log("查询错误："+serachSql+err);
        }else{
            //console.log(JSON.stringify( rows));
             //console.log(rows[0].int_service_num);
             console.log(id);
             var result = '{"name":'+id+',"child":'+JSON.stringify(rows)+'}';
             console.log(result);
             res.send(result);
        }
   })
   

});
module.exports = router;