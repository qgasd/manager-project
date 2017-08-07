var express = require('express');
var router = express.Router();

var db = require('../public/javascripts/mysql.js'); 

/**
 * 查询员工列表页
 */
router.get("/",function(req,res,next){
    db.query("select * from employees_information",function(err,rows){
        if(err){
            console.log("查询错误："+err);
        }else {
            console.log("======================"+JSON.stringify(req.path));
            console.log(JSON.stringify(rows));
            res.send (JSON.stringify(rows));
        }
    });
});

/**
 * 添加员工信息
 */
// router.get("/add",function(req,res,next){
//     res.render("add");
// });
router.get("/add",function(req,res,next){
    var gender = 'w';//req.body.gender;
    var name = 'e';//req.body.name;
    var tel = 't';//req.body.tel;
    var mobile = 'o';//req.body.mobile;
    var email = 'o';//req.body.email;
    var departmentNo = 'o';//req.body.departmentNo;
    var department = 'o';//req.body.department;
    var relDepartmentNo = 'o';//req.body.relDepartmentNo;
    var relDepartment = 'o';//req.body.relDepartment;
    var company = 'o';//req.body.company;
    var isEmployee = 'o';//req.body.isEmployee;
    var PRQuestion = 'o';//req.body.PRQuestion;
    var PRAnswer = 'o';//req.body.PRAnswer;
    var OTMID = 'o';//req.body.OTMID;
    var title = 'o';//req.body.title;
    var role = 'o';//req.body.role;
    var status = 'o';//req.body.status;
    var lastUpdateTS = 'o';//req.body.lastUpdateTS;
    var badgeNumber = 'o';//req.body.badgeNumber;
    var createTS = 'o';//req.body.createTS;
    var comment2 ='55';//req.body.comment2;
    var sql = "insert into employees_information("+
        "Gender,Name,Tel,Mobile,Email,DepartmentNo,Department,"+
        "RelDepartmentNo,RelDepartment,Company,IsEmployee,PRQuestion,"+
        "PRAnswer,OTMID,Title,Role,Status,Comment,LastUpdateTS,BadgeNumber,CreateTS) "+
        "values('"+
        gender+"','"+
        name+"','"+
        tel+"','"+
        mobile+"','"+
        email+"','"+
        departmentNo+"','"+
        department+"','"+
        relDepartmentNo+"','"+
        relDepartment+"','"+
        company+"','"+
        isEmployee+"','"+
        PRQuestion+"','"+
        PRAnswer+"','"+
        OTMID+"','"+
        title+"','"+
        role+"','"+
        status+"','"+
        comment2+"','"+
        lastUpdateTS+"','"+
        badgeNumber+"','"+
        createTS+"')";

    db.query(sql,function(err,rows){
        if(err){
            console.log("添加错误："+err);
        }else {
           // console.log(JSON.stringify(rows));
            res.redirect("/employees");
        }
    });
});

/**
 * 删除员工信息
 */
router.get("/del/id",function(req,res){
    var id = req.params.id;
    db.query("delete from employees_information where ADCN = " + id,function(err,rows){
        if(err){
            console.log("删除失败",err);
            //res.send("删除失败"+err);
        }else {
            //console.log(JSON.stringify(rows));
            res.redirect("/employees");
        }
    });
});

/**
 * 修改
 */
router.get("/toUpdate/:id",function(req,res,next){
    var id = req.params.id;
    var sql = "select * from employees_information where ADCN = " + id;
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
    var gender = req.body.gender;
    var name = req.body.name;
    var tel = req.body.tel;
    var mobile = req.body.mobile;
    var sql = "update employees_information set Type = '"+ gender +"',Parent = '"+ name +"',Key = '"+ tel +"',Value = '"+ mobile +"' where ID = " + id;
    console.log(sql);
    db.query(sql,function(err,rows){
        if(err){
            console.log("修改失败" + err);
            //res.send("修改失败 " + err);
        }else {
            console.log(JSON.stringify(rows));
            res.redirect("/employees");
        }
    });
});

/**
 * 查询
 */
router.post("/search",function(req,res,next){
    var gender = req.body.gender;
    var name = req.body.name;
    var tel = req.body.tel;
    var mobile = req.body.mobile;
    var sql = "select * from employees_information";
    if(name){
        sql += " where Type = '"+ name +"'";
    }
    if(mobile){
        sql += " and Parent = '" + mobile + "'";
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