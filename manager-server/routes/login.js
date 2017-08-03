var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');
var LdapStrategy = require('passport-ldapauth');

var Base = require('js-base64').Base64;

var ActiveDirectoryStrategy = require('../public/javascripts/passport-activedirectory/index.js');
var db=require("../public/javascripts/mysql.js");  
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });
 
var ActiveDirectory=require('activedirectory');



 //AD验证服务器配置
 var config = { url: 'ldap://172.21.21.218:389',
               baseDN: 'dc=scrcu,dc=com',
               username:'9527@scrcu.com',
               password: 'QG123@1234'   };

 var ad = new ActiveDirectory(config);
 
passport.use(new ActiveDirectoryStrategy({
  integrated: false,
  passReqToCallback:true,
  ldap: ad
}, function (req,profile, ad, done) {
    return done(null, profile);
  }
));
var router = express.Router();
router.use(passport.initialize());
router.use(passport.session());
var opts = { failWithError: true,session:false }
//passport验证
router.post('/', passport.authenticate('ActiveDirectory', opts), function(req, res) {
  console.log(req.user._json.sAMAccountName);
  var username = req.user._json.sAMAccountName;
  //根据当前的验证的用户名获取所属组别的信息
  ad.getGroupMembershipForUser(username,function(err,groups){
if (err) {
    console.log('ERROR: ' +JSON.stringify(err));
    return;
  }
  if (!groups) console.log('User: ' + sAMAccountName + ' not found.');
  else {console.log("验证成功！"+JSON.stringify(groups));
          
db.query('SELECT 1+1 AS solution', function (err, rows) {
  if(err){}
  else{
    console.log(rows);
  }
}); 
        res.send(JSON.stringify(groups));
  }//返回组别信息
  })
  
}, function (err) {
  res.status(401).send({success: true, message: '验证失败'})
})
module.exports = router;