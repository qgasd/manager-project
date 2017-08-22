
var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');
var LdapStrategy = require('passport-ldapauth');

var Base = require('js-base64').Base64;

var ActiveDirectoryStrategy = require('../public/javascripts/passport-activedirectory/index.js');
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
router.post('/', function(req,res,next){
  passport.authenticate('ActiveDirectory', opts,function(err,user,info){
    if(user==false||user===undefined){
      res.send({"isok":false})
    }else{
      console.log("+++++++++++++++>>>>>"+JSON.stringify(user));
      
        var username = user._json.sAMAccountName;
        var password = req.body.password;
        var ischecked = req.body.ischecked;
        console.log(password);
        var account={
          username:username,
          password:password,
        }
        //根据当前的验证的用户名获取所属组别的信息
        ad.getGroupMembershipForUser(username,function(err,groups){
      if (err) {
          console.log('ERROR: ' +JSON.stringify(err));
          return;
        }
        if (!groups){
          console.log('User: ' + sAMAccountName + ' not found.');
        }else {
          account.username=req.body.username;
          account.password=req.body.password;
          req.session.user=account;
          req.session.sign=true;
          console.log("验证成功！"+JSON.stringify(groups));
      if(ischecked=="true"){
            res.clearCookie('sessionId');
            res.cookie("account",account,{maxAge:60*1000*60*24*7});
          }else{
            res.clearCookie('account');
            res.cookie('sessionId',req.session.id);
          }
          res.send({"isok":true});
         // res.send({'username':username,'password':password,'session':req.session});//返回组别信息 
        }//返回组别信息
        })
    } 
  })(req,res,next);
}),
//passport验证
// router.post('/', passport.authenticate('ActiveDirectory', opts), function(req, res) {
  
//   var username = req.user._json.sAMAccountName;
//   var password = req.body.password;
//   var ischecked = req.body.ischecked;
//   var account={
//     username:username,
//     password:password,
//   }
//   //根据当前的验证的用户名获取所属组别的信息
//   ad.getGroupMembershipForUser(username,function(err,groups){
// if (err) {
//     console.log('ERROR: ' +JSON.stringify(err));
//     return;
//   }
//   if (!groups){
//     console.log('User: ' + sAMAccountName + ' not found.');
//   }else {
//     account.username=req.body.username;
//     account.password=req.body.password;
//     req.session.user=account;
//     req.session.sign=true;
//     console.log("验证成功！"+JSON.stringify(groups));
//  if(ischecked=="true"){
//       res.clearCookie('sessionId');
//       res.cookie("account",account,{maxAge:60*1000*60*24*7});
//     }else{
//       res.clearCookie('account');
//       res.cookie('sessionId',req.session.id);
//     }
//     res.send({'username':username,'password':password,'session':req.session});//返回组别信息 
//   }//返回组别信息
//   })
  
// }, function (err) {
//   res.status(401).send({success: true, message: '验证失败'})
// })
module.exports = router;
