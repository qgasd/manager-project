var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/mysql.js'); 
//查询调用关系
router.get("/serach/:id",function(req,res,next){
    var num = req.params.id;
         //db.query("SELECT * FROM int_invoke_relation WHERE FIND_IN_SET(invoke_int_service_num,getParLst ("+num+")) ",function(err,rows){
            db.query(
            `SELECT 
                a.*,b.* 
            FROM
                int_invoke_relation a,int_information b  
            WHERE FIND_IN_SET(invoke_int_service_num, getParLst (`+num+`))
            AND a.int_service_num=b.int_service_num ;`,
          function(err,rows){
            if(err){
                console.log("查询错误："+err);
            }else {
                db.query(`
                    SELECT 
                        * 
                    FROM
                        int_information b 
                    WHERE b.int_service_num=`+num+`
                `,function(err,rows2){
                    if(err){
                        console.log("查询错误："+err);
                    }else{
                        console.log(JSON.stringify(rows));
                        console.log(JSON.stringify(rows2));
                        if(rows.length>0){
                            var str = JSON.stringify(convert(rows,num));
                            console.log("str:"+str);
                            if(str!='undefined')
                            var jsonstr =  '{"int_name_cn":"'+rows2[0].int_name_cn
                            +'","int_name_en":"'+rows2[0].int_name_en
                            +'","description":"'+rows2[0].description+'","int_service_num":'+num+','
                            +str.substring(1,str.length);
                            console.log("jsonstr:"+jsonstr);            
                            res.send(jsonstr);
                        }else{
                            var str = '{"int_name_cn":"'+rows2[0].int_name_cn
                            +'","int_name_en":"'+rows2[0].int_name_en
                            +'","description":"'+rows2[0].description+'","int_service_num":'+num+'}'
                            console.log("s:"+str);
                            res.send(str);
                        }
                    }
                    

                })
               

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
         tmp[item.int_service_num].int_name_cn=item.int_name_cn;
         tmp[item.int_service_num].int_name_en=item.int_name_en;
         tmp[item.int_service_num].description=item.description;
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