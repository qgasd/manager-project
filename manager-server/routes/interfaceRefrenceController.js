var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/mysql.js'); 
//查询调用关系
// router.get('/serach/:id',function(req,res,next){
//     var id = req.params.id;
//     console.log(id);
//     //var serachSql = "SELECT a.*,b.`invoke_int_service_num`,b.`state`,b.`valid_date`,b.`origin_type` FROM int_information a,int_invoke_relation b WHERE a.`int_service_num` = b.`int_service_num` AND b.`int_service_num`=" + id;
//    var serachSql = "SELECT * FROM int_invoke_relation WHERE FIND_IN_SET(invoke_int_service_num,queryChildrenAreaInfo ("+id +"))";
//     db.query(serachSql,function(err,rows){
//         if(err){
//             console.log("查询错误："+serachSql+err);
//         }else{
//             //console.log(JSON.stringify( rows));
//              //console.log(rows[0].int_service_num);
//              console.log(rows.length);
//              var result = '{"name":'+id+',"children":'+'['+'{"name":'+JSON.stringify(rows[0].int_service_num)+','+'"children":'+'['+'{"name":'+JSON.stringify(rows[2].int_service_num)+'}'+']'+'}'+']'+'}';
//              console.log(result);
//              res.send(result);
//         }
//    })
   

// });
router.get("/serach/:id",function(req,res,next){
    var num = req.params.id;
        //db.query("SELECT * FROM int_invoke_relation WHERE int_service_num="+num,function(err,rows){
         db.query("SELECT * FROM int_invoke_relation WHERE FIND_IN_SET(invoke_int_service_num,getParLst ("+num+")) ",function(err,rows){
         if(err){
             console.log("查询错误："+err);
         }else {
             console.log(JSON.stringify(rows));
             var str = JSON.stringify(convert(rows,num));
             console.log("str:"+str);
             
             var jsonstr =  '{"int_service_num":'+num+","+str.substring(1,str.length);
             console.log("jsonstr:"+jsonstr);            
             res.send(jsonstr);
         }
     });
 });
 
 
 function convert(source,num){
     var tmp={},parent,n;
     for(n=0;n<source.length;n++){
         var item=source[n];
         console.log("2:"+item.int_service_num);
         if(item.int_service_num==item.invoke_int_service_num){
             parent=item.int_service_num;
         }
         if(!tmp[item.int_service_num]){
             tmp[item.int_service_num]={};
         }
        // tmp[item.int_service_num].Name=item.Name;
         tmp[item.int_service_num].int_service_num=item.int_service_num;
         if(!("children" in tmp[item.int_service_num]))tmp[item.int_service_num].children=[];
          
         if(item.int_service_num!=item.invoke_int_service_num){   
             if(tmp[item.invoke_int_service_num]){
                 tmp[item.invoke_int_service_num].children.push(tmp[item.int_service_num]);
             }
             else{
                 tmp[item.invoke_int_service_num]={children:[tmp[item.int_service_num]]};
             }
         }
     }
     console.log(JSON.stringify(tmp));
     return tmp[num];
 }
module.exports = router;