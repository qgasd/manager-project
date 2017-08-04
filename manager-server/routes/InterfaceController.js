var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/mysql.js'); 
//搜索功能
router.post('/search',function(req,res,next){
    var softWare=req.body.rjcpxtmc;
    var greatClass=req.body.bigSpecil;
    var lessClass=req.body.smallspec;
    var state=req.body.state;
    var nameCN=req.body.fuDesc;
    var nameEN=req.body.chineName;
    var description=req.body.englishName;
    var URL=req.body.surl;
    var remark=req.body.tips;
    var searchSql="select * from int_information where 1=1 ";
    if(softWare!=null||softWare!=''){
        searchSql+=" and software_num="+softWare;
    }
    if(greatClass!=null||greatClass!=''){
        searchSql+=" and greatClass="+greatClass;
    }
    if(lessClass!=null||lessClass!=''){
        searchSql+=" and lessClass="+lessClass;
    }
    if(state!=null||state!=''){
        searchSql+=" and state="+state;
    }  
    if(nameCN!=null||nameCN!=''){
        searchSql+=" and nameCN="+nameCN;
    }   
    if(nameEN!=null||nameEN!=''){
        searchSql+=" and nameEN="+nameEN;
    }
    if(description!=null||description!=''){
        searchSql+=" and description="+description;
    }
    if(URL!=null||URL!=''){
        searchSql+=" and URL="+URL;
    }
    if(remark!=null||remark!=''){
        searchSql+=" and remark="+remark;
    }
    db.query(searchSql,function(err,rows){//执行条件查询语句
        if(err){
            console.log("查询错误");
            res.send({success:false,message:'查询错误!'});
        }
        else{
            console.log("查询成功");
            res.send (JSON.stringify(rows));
        }
    });

});
//查询接口所有信息
router.get('/', function(req, res, next) {
    db.query("select * from int_information",function(err, rows){
        if(err){
            console.log("查询错误：select * from int_information"+err);
        }
        else{
            console.log(JSON.stringify(rows));
            res.send (JSON.stringify(rows));
        }
    })
});
//新增接口信息
router.post('/insert',function(req, res, next){
    var data=req.body;
    var serviceNum=data.fwbm;
    var softWare=data.rjcpxtmc;
    var greatClass=data.bigSpecil;
    var lessClass=data.smallspec;
    var state=data.state;
    var nameCN=data.fuDesc;
    var nameEN=data.chineName;
    var description=data.englishName;
    var URL=data.surl;
    var remark=data.tips;
    console.log(JSON.stringify(data));
    var insertSql="insert into int_information(software_num,great_class,less_class,"+
                "state,int_name_cn,int_name_en,description,URL,remark)values("
                    +softWare+
                ","+greatClass+//','
                ","+lessClass+
                ","+state+
                ","+nameCN+
                ","+nameEN+
                ","+description+
                ","+URL+
                ","+remark+
                ")";
    db.query(insertSql,function(err,rows){
        if(err){
            console.log("新增失败！");
            res.send({success:false,message:'新增失败！'});
        }
        else{
            console.log("新增成功！");
            res.send({success:true,message:'新增成功！'});
        }
    });
});
//删除一条数据
router.get("/delete/:id",function(req,res,next){
    var id=req.param.id;
    var deleteSql="update int_information set state=100 where int_service_num="+id;
    db.query(deleteSql,function(err,rows){
        if(err){
            console.log("删除失败！");
        }
        else{
            console.log("删除成功！");
        }
    });
})
//修改数据
router.post("/update/:id",function(req,res,next){
    var id=req.param.id;
    var serviceNum=req.body.fwbm;
    var softWare=req.body.rjcpxtmc;
    var greatClass=req.body.bigSpecil;
    var lessClass=req.body.smallspec;
    var state=req.body.state;
    var nameCN=req.body.fuDesc;
    var nameEN=req.body.chineName;
    var description=req.body.englishName;
    var URL=req.body.surl;
    var remark=req.body.tips;
    var updateSql="update int_information set software_num='"
            +softWare
            +"',greatClass='"+greatClass
            +"',lessClass='"+lessClass
            +"',state='"+state
            +"',nameCN='"+nameCN
            +"',nameEN='"+nameEN
            +"',description='"+description
            +"',URL='"+URL
            +"',remark='"+remark
            +"',greatClass='"+greatClass
            +"'where int_service_num="+id;
    db.query(updateSql,function(err,rows){
        if(err){
            console.log("修改失败！");
        }
        else{
            console.log("修改成功！");
        }
    })
});
module.exports = router;