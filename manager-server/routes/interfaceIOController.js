var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/mysql.js'); 
//搜索功能
router.get("/serach/:id",function(req,res,next){
    var serviceNum=req.params.id;
    var searchSql=`
        SELECT
        a.*,b.int_name_cn,b.int_name_en
        FROM
        int_io_params a,int_information b
        WHERE a.int_service_num=`+serviceNum+` and b.int_service_num=`+serviceNum;
    console.log(searchSql)
    db.query(searchSql,function(err,rows){
        if(err){
            console.log(err);
        }
        else{
            var input = [];
            var output = [];
            if(rows.length>0)
            for( r in rows){
                if(rows[r].type=='input'){
                    input.push(rows[r]);
                }else if(rows[r].type=='output'){
                    output.push(rows[r]);
                }
          
            }

            var jsonstr = '{"input":'+JSON.stringify(input)+',"output":'+JSON.stringify(output)+'}'
            console.log(jsonstr)
            res.send(jsonstr);
        }
    })
});
module.exports = router;
