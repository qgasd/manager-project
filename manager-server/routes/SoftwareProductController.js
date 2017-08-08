var express = require('express');
var router = express.Router();

var db = require('../public/javascripts/mysql.js'); 

/**
 * 查询软件产品列表页
 */
router.get("/",function(req,res,next){
    db.query("select * from software_product",function(err,rows){
        if(err){
            console.log("查询错误："+err);
        }else {
            console.log(JSON.stringify(rows));
            res.send (JSON.stringify(rows));
        }
    });
});

/**
 * 添加软件产品
 */
// router.get("/add",function(req,res,next){
//     res.render("add");
// });
router.get("/add",function(req,res,next){
    var softwareName = 'w';//req.body.softwareName;
    var softwareLineName = 'e';//req.body.softwareLineName;
    var type = 't';//req.body.type;
    var coreSoftwareMark = 'o';//req.body.coreSoftwareMark;
    var status = 'o';//req.body.status;
    var launchDate = 'o';//req.body.launchDate;
    var dept = 'o';//req.body.dept;
    var productLeader = 'o';//req.body.productLeader;
    var requirementsLeader = 'o';//req.body.requirementsLeader;
    var testLeader = 'o';//req.body.testLeader;
    var serviceLeader = 'o';//req.body.serviceLeader;
    var ProjectLeader = 'o';//req.body.ProjectLeader;
    var sql = "insert into software_product("+
        "software_name,software_line_name,type,core_software_mark,status,launch_date,dept,"+
        "product_leader,requirements_leader,test_leader,service_leader,Project_leader)"+
        "values('"+
        softwareName+"','"+
        softwareLineName+"','"+
        type+"','"+
        coreSoftwareMark+"','"+
        status+"','"+
        launchDate+"','"+
        dept+"','"+
        productLeader+"','"+
        requirementsLeader+"','"+
        testLeader+"','"+
        serviceLeader+"','"+
        ProjectLeader+"','"+"')";
    db.query(sql,function(err,rows){
        if(err){
            console.log("添加错误："+err);
        }else {
           // console.log(JSON.stringify(rows));
            res.redirect("/softwareProduct");
        }
    });
});

/**
 * 删除软件产品
 */
router.get("/del/id",function(req,res){
    var id = req.params.id;
    db.query("delete from software_product where software_num = " + id,function(err,rows){
        if(err){
            console.log("删除失败",err);
            //res.send("删除失败"+err);
        }else {
            //console.log(JSON.stringify(rows));
            res.redirect("/softwareProduct");
        }
    });
});

/**
 * 修改
 */
router.get("/toUpdate/:id",function(req,res,next){
    var id = req.params.id;
    var sql = "select * from software_product where software_num = " + id;
    console.log(sql);
    db.query(sql,function(err,rows){
        if(err){
            console.log("修改页面跳转失败"+err);
            //res.send("修改页面跳转失败");
        }else {
            res.render("update",{datas:rows});
        }
    });
});
router.post("/update",function(req,res,next){
    var softwareName = 'w';//req.body.softwareName;
    var softwareLineName = 'e';//req.body.softwareLineName;
    var type = 't';//req.body.type;
    var coreSoftwareMark = 'o';//req.body.coreSoftwareMark;
    var status = 'o';//req.body.status;
    var launchDate = 'o';//req.body.launchDate;
    var dept = 'o';//req.body.dept;
    var productLeader = 'o';//req.body.productLeader;
    var requirementsLeader = 'o';//req.body.requirementsLeader;
    var testLeader = 'o';//req.body.testLeader;
    var serviceLeader = 'o';//req.body.serviceLeader;
    var ProjectLeader = 'o';//req.body.ProjectLeader;
    var sql = "update software_product set Type = '"+ softwareName +"',Parent = '"+ softwareLineName +"',Key = '"+ type +"',Value = '"+ coreSoftwareMark +"' where ID = " + id;
    console.log(sql);
    db.query(sql,function(err,rows){
        if(err){
            console.log("修改失败" + err);
            //res.send("修改失败 " + err);
        }else {
            console.log(JSON.stringify(rows));
            res.redirect("/softwareProduct");
        }
    });
});

/**
 * 查询
 */
router.post("/search",function(req,res,next){
    var softwareName = 'w';//req.body.softwareName;
    var softwareLineName = 'e';//req.body.softwareLineName;
    var type = 't';//req.body.type;
    var coreSoftwareMark = 'o';//req.body.coreSoftwareMark;
    var status = 'o';//req.body.status;
    var launchDate = 'o';//req.body.launchDate;
    var dept = 'o';//req.body.dept;
    var productLeader = 'o';//req.body.productLeader;
    var requirementsLeader = 'o';//req.body.requirementsLeader;
    var testLeader = 'o';//req.body.testLeader;
    var serviceLeader = 'o';//req.body.serviceLeader;
    var ProjectLeader = 'o';//req.body.ProjectLeader;
    var sql = "select * from software_product";
    if(softwareName){
        sql += " where Type = '"+ softwareName +"'";
    }
    if(softwareLineName){
        sql += " and Parent = '" + softwareLineName + "'";
    }

    sql.replace("and","where");
    db.query(sql,function(err,rows){
        if(err){
            console.log("查询失败: "+err);
            //res.send("查询失败: "+err);
        }else{
            res.send (JSON.stringify(rows));
            //res.render("users",{title:"用户列表",datas:rows,s_name:name,s_age:age});
        }
    });
})
module.exports = router;