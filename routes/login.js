
var express = require('express');
var router = express.Router();

//CSRFミドルウェアを生成する
var csrf = require('csrf');
var tokens = new csrf();
const bcrypt = require('bcrypt');
import LibAuth from "../libs/LibAuth"
import LibCsrf from "../libs/LibCsrf"
import LibMongo from "../libs/LibMongo"

/******************************** 
* 
*********************************/
router.get('/', function(req, res) {
  try{
    LibCsrf.set_token(req, res) 
    res.render('login', { user : "" });
  } catch (e) {
      console.log(e);
  }
});
/******************************** 
* 
*********************************/
router.post('/',async function(req, res){
    try{
        if(LibCsrf.valid_token(req, res)== false){ return false; }
        var data = req.body
console.log( data)  
        var valid_user = await LibAuth.validUserAuth(res ,data.email, data.password )
        if (valid_user){
            req.flash('success', 'Welcom, Login completed.');  
            res.redirect('/')
        }else{
            req.flash('err', 'Error Login, authrize NG');
            console.log("error, login");
            res.clearCookie('user');
            res.redirect('/login')
        }        
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }

});

module.exports = router;
