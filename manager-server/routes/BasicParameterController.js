var express = require('express');
var router = express.Router();

var db = require('../public/javascripts/mysql.js'); 

//搜索功能
router.post('/search',function(req,res,next){
    var data=req.body;
    var type=req.body.Type;
    var parent=req.body.Parent;

    var searchSql="select * from bas_parameter where 1 = 1";
    if(type!=undefined&&type!=null&&type!=''){
        searchSql+=" and type = '"+type+"'";
    }
    if(parent!=undefined&&parent!=null&&parent!=''){
        searchSql+=" and parent = '"+parent+"'";
    }
 
    console.log("测试语句：:"+searchSql);//测试sql语句
    db.query(searchSql,function(err,rows){//执行条件查询语句
        if(err){
            console.log(new Date()+"查询错误"+err);
            res.send({success:false,message:'查询失败!'});
        }
        else{
            var datas=JSON.stringify(rows);
            var data='{"total":'+rows.length+',"items":'+datas+'}';
            console.log(new Date()+"查询成功");
            res.send (data);
        }
    });

});

/**
 * 查询基础参数列表页
 */
router.post("/",function(req,res,next){
    db.query("select * from bas_parameter",function(err,rows){
        if(err){
            console.log("查询错误："+err);
        }else {
            var datas = JSON.stringify(rows);
            var data='{"total":'+rows.length+',"items":'+datas+'}';         
            res.send (data);
        }
    });
});

/**
 * 添加参数
 */
router.post("/add",function(req,res,next){
    var type = req.body.Type;
    var parent = req.body.Parent;
    var key = req.body.Key;
    var value = req.body.Value;
    db.query("insert into bas_parameter(type,parent,`key`,`value`) values('"+type+"','"+parent+"','"+key+"','"+value+"')",function(err,rows){
        if(err){
            console.log("添加错误："+err);
        }else {
            console.log("添加成功！");
        }
    });
});

/**
 * 删除参数
 */
router.delete("/del/:id",function(req,res){
    var id = req.params.id;
    db.query("delete from bas_parameter where ID = " + id,function(err,rows){
        if(err){
            console.log("删除失败",err);
        }else {
            console.log("删除成功！");
            res.send({success:true,message:"删除成功！"});
        }
    });
});

/**
 * 修改参数
 */
router.get("/toUpdate/:id",function(req,res,next){
    var id = req.params.id;
    var sql = "select * from basic_parameter where ID = " + id;
    console.log(sql);
    db.query(sql,function(err,rows){
        if(err){
            console.log("修改页面跳转失败"+err);
        }else {
            res.render("update",{datas:rows});
        }
    });
});
router.post("/update",function(req,res,next){
    var type = req.body.type;
    var parent = req.body.parent;
    var key = req.body.key;
    var value = req.body.value;
    var sql = "update basic_parameter set Type = '"+ type +"',Parent = '"+ parent +"',Key = '"+ key +"',Value = '"+ value +"' where ID = " + id;
    console.log(sql);
    db.query(sql,function(err,rows){
        if(err){
            console.log("修改失败" + err);
            //res.send("修改失败 " + err);
        }else {
            console.log(JSON.stringify(rows));
            res.redirect("/basicParameter");
        }
    });
});


module.exports = router;