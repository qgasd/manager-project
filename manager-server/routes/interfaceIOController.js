var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/mysql.js'); 
//搜索功能
router.get("/serach/:id",function(req,res,next){
    var serviceNum=req.params.id;
    var searchSql=`
        SELECT
        a.*
        FROM
        int_io_params a
        WHERE a.int_service_num=
    `+serviceNum;
    db.query(searchSql,function(err,rows){
        if(err){
            console.log(err);
        }
        else{
            console.log(rows);
            var input = [];
            var output = [];
            var interface = [];
            for(r in rows){
                console.log(rows[r].name_cn+":"+rows[r].name_en);
                if(rows[r].type=='input'){
                    input.push(rows[r]);
                }else if(rows[r].type=='output'){
                    output.push(rows[r]);
                }
          
            }
            console.log("输入："+JSON.stringify(input));
            console.log("输出："+JSON.stringify(output));
            var jsonstr = '{"input":'+JSON.stringify(input)+',"output":'+JSON.stringify(output)+'}'
            console.log(jsonstr);
            res.send(jsonstr);
        }
    })
});
module.exports = router;
