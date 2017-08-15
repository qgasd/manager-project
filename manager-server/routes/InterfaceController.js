var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/mysql.js'); 
//搜索功能
router.post('/search',function(req,res,next){
    var data=req.body;
    var serviceNum=req.body.int_service_num;
    var softWare=req.body.software_num;
    var greatClass=req.body.great_class;
    var lessClass=req.body.less_class;
    var state=req.body.state;
    var nameCN=req.body.int_name_cn;
    var nameEN=req.body.int_name_en;
    var description=req.body.description;
    var URL=req.body.URL;
    var remark=req.body.remark;
    
    var pageNum=req.body.page;
    var pagePer=req.body.itemsPerPage;
    var searchSql="select * from int_information where 1=1 ";
    if(serviceNum!=undefined&&serviceNum!=null&&serviceNum!=''){
        searchSql+=" and int_service_num = "+serviceNum+"";
    }
    if(softWare!=undefined&&softWare!=null&&softWare!=''){
        searchSql+=" and software_num = '"+softWare+"'";
    }
    if(greatClass!=undefined&&greatClass!=null&&greatClass!=''){
        searchSql+=" and great_class ='"+greatClass+"'";
    }
    if(lessClass!=undefined&&lessClass!=null&&lessClass!=''){
        searchSql+=" and less_class = '"+lessClass+"'";
    }
    if(state!=undefined&&state!=null&&state!=''){
        searchSql+=" and state = '"+state+"'";
    }  
    if(nameCN!=undefined&&nameCN!=null&&nameCN!=''){
        searchSql+=" and int_name_cn = '"+nameCN+"'";
    }   
    if(nameEN!=undefined&&nameEN!=null&&nameEN!=''){
        searchSql+=" and int_name_en = '"+nameEN+"'";
    }
    if(description!=undefined&&description!=null&&description!=''){
        searchSql+=" and description like '%"+description+"%'";
    }
    if(URL!=undefined&&URL!=null&&URL!=''){
        searchSql+=" and URL like '%"+URL+"%'";
    }
    if(remark!=undefined&&remark!=null&&remark!=''){
        searchSql+=" and remark like '%"+remark+"%'";
    }
    //判断分页参数是否为空
    if(pageNum!=null&&pageNum!=undefined&&pagePer!=null&&pagePer!=undefined){
        searchSql+=" limit "+(pageNum-1)*pagePer+", "+pagePer;
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
//查询接口所有信息
router.post('/', function(req, res, next) {
    console.log(JSON.stringify(req.body));
    var pageNum=req.body.page;
    var pagePer=req.body.itemsPerPage;
    var limitSql="select * from int_information where state='active' ";
    if(pageNum!=null&&pageNum!=undefined&&pagePer!=null&&pagePer!=undefined){
        limitSql+=" limit "+(pageNum-1)*pagePer+", "+pagePer;
    }
    db.query(limitSql,function(err, rows){
        if(err){
            console.log(new Date()+"查询错误："+limitSql+err);
        }
        else{
            var datas=JSON.stringify(rows);
            var data='{"total":'+rows.length+',"items":'+datas+'}';
            console.log(new Date()+data);
            res.send (data);
        }
    })
});
//新增接口信息
router.post('/insert',function(req, res, next){
    var serviceNum=req.body.int_service_num;
    var softWare=req.body.software_num;
    var greatClass=req.body.great_class;
    var lessClass=req.body.less_class;
    var state=req.body.state;
    var nameCN=req.body.int_name_cn;
    var nameEN=req.body.int_name_en;
    var description=req.body.description;
    var URL=req.body.URL;
    var remark=req.body.remark;
    var insertSql="insert into int_information(software_num,great_class,less_class,"+
                "state,int_name_cn,int_name_en,description,URL,remark)values('"
                    +softWare+
                "','"+greatClass+
                "','"+lessClass+
                "','"+state+
                "','"+nameCN+
                "','"+nameEN+
                "','"+description+
                "','"+URL+
                "','"+remark+
                "')";
    db.query(insertSql,function(err,rows){
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
//删除一条数据
router.delete("/delete/:id",function(req,res,next){
    var id=req.params.id;

    var deleteSql="update int_information set state='hidden' where int_service_num="+id;//此处进行逻辑删除
    db.query(deleteSql,function(err,rows){
        if(err){
            console.log(new Date()+"删除失败！"+err);
        }
        else{ 
            console.log(new Date()+"删除成功！");
            res.send({success:true,message:"删除成功！"});
        }
    });
});
// router.get("/delete/:id",function(req,res,next){
//     var id=req.params.id;

//     var deleteSql="update int_information set state='hidden' where int_service_num="+id;//此处进行逻辑删除
//     db.query(deleteSql,function(err,rows){
//         if(err){
//             console.log("删除失败！"+err);
//         }
//         else{
//             console.log("删除成功！");
//             res.send({});
//         }
//     });
// });
//修改数据
router.post("/update",function(req,res,next){
    //var id=req.params.id;
    console.log(JSON.stringify(req.body));
    var serviceNum=req.body.int_service_num;
    var softWare=req.body.software_num;
    var greatClass=req.body.great_class;
    var lessClass=req.body.less_class;
    var state=req.body.state;
    var nameCN=req.body.int_name_cn;
    var nameEN=req.body.int_name_en;
    var description=req.body.description;
    var URL=req.body.URL;
    var remark=req.body.remark;
    var updateSql="update int_information set software_num='"
            +softWare
            +"',great_class='"+greatClass
            +"',less_class='"+lessClass
            +"',state='"+state
            +"',int_name_cn='"+nameCN
            +"',int_name_en='"+nameEN
            +"',description='"+description
            +"',URL='"+URL
            +"',remark='"+remark
            +"' where int_service_num="+serviceNum;
    db.query(updateSql,function(err,rows){
        if(err){
            console.log(new Date()+"修改失败！"+err);
        }
        else{
            console.log(new Date()+"修改成功！");
        }
    })
});
module.exports = router;