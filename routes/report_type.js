var express = require('express');
var router = express.Router();

import LibCommon from "../libs/LibCommon"
import LibCsrf from "../libs/LibCsrf"
import LibMongo from "../libs/LibMongo"
var ObjectID = require('mongodb').ObjectID;

/* GET users listing. */
router.get('/', function(req, res, next) {
  var query = req.query;
  var page = 1;
  if(query.page != null){
      page = query.page
      console.log( "page=", page )
  }  
    res.render('report_type/index', {"page": page } );  
});

/******************************** 
* 
*********************************/
router.get('/test', function(req, res, next) {
    res.render('orders/test', {});
});   
  
module.exports = router;
