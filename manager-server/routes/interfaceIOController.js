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


//新增
router.post("/add",function(req,res,next){
    var int_service_num = req.body.int_service_num;
    var type = req.body.type;
    var name_en = req.body.name_en;
    var name_cn = req.body.name_cn;
    var field_type = req.body.field_type;
    var lob = req.body.lob;
    var example = req.body.example;
    var describe = req.body.describe;
    // var addSql = `
    // INSERT INTO int_io_params (
    //     int_service_num,
    //     type,
    //     name_en,
    //     name_cn,
    //     field_type,
    //     lob,
    //     example,
    //     describe
    // ) 
    // values (
    //     '`+int_service_num+`','`
    //     +type+`','`
    //     +name_en+`','`
    //     +name_cn+`','`
    //     +field_type+`','`
    //     +lob+`','`
    //     +example+`','`
    //     +describe+`'
    // ) 
    // `;
    var addSql = "INSERT INTO int_io_params("
        +"int_service_num,"
        +"`type`,"
        +"name_en,"
        +"name_cn,"
        +"field_type,"
        +"lob,"
        +"`example`,"
        +"`describe`"
    +")"+ 
    "values ('"
    +int_service_num+"','"
    +type+"','"
    +name_en+"','"
    +name_cn+"','"
    +field_type+"','"
    +lob+"','"
    +example+"','"
    +describe
    +"')";
    console.log(addSql);
    db.query(addSql,function(err,rows){
        if(err){
            console.log(new Date()+"新增失败！"+err);
            res.send({success:false,message:'新增失败！'});
        }
        else{
            console.log(new Date()+"新增成功！");
            res.send({success:true,message:'新增成功！'});
        }
    });
});
module.exports = router;
