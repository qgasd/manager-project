var express = require('express');
var router = express.Router();

var db = require('../public/javascripts/mysql.js'); 

router.get('/', function(req, res, next) {
    db.query("select * from int_information",function(err, rows){
        if(err){
            console.log("查询错误：select * from int_information"+err);
        }
        else{
            console.log(JSON.stringify(rows));
          //res.json(rows);
           res.send (JSON.stringify(rows));
        }
    })
});

module.exports = router;