var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/mysql.js'); 
//搜索功能
router.get("/search/:id",function(req,res,next){
    var serviceNum=req.params.id;
    var searchSql=`
        SELECT
        a.*,b.int_name_cn,b.int_name_en,b.description
        FROM
        int_io_params a,int_information b
        WHERE a.int_service_num=b.int_service_num AND a.int_service_num=
    `+serviceNum;
    db.query(searchSql,function(err,rows){
        if(err){
            console.log(err);
        }
        else{
            console.log(rows);
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
            
            res.send(jsonstr);
        }
    })
});
module.exports = router;
