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
    res.render('orders/index', {"page": page } );  
});
/******************************** 
* 
*********************************/
router.get('/add',async function(req, res, next) {
    try{
        LibCsrf.set_token(req, res) 
//        const collection = await LibMongo.get_collection("books" )
        const collection = await LibMongo.get_collection_mongo2("books" )
        collection.find({} ).toArray(function(err, result) {
            if (err) throw err;
//console.log(result);
            res.render('orders/new', {books: result });
        });
    } catch (err) {
        console.log(err);
        res.status(500).send();    
    } 

});
/******************************** 
* 
*********************************/
router.post('/add', async function(req, res, next) {
    try{
        if(LibCsrf.valid_token(req, res)== false){ return false; }
        var data = req.body
console.log(data  )
        var item = {
            book_id: new ObjectID( data.book_id) ,  
            order_num: data.order_num,
            created_at: new Date(),
        };
        const collection = await LibMongo.get_collection("orders" )
        await collection.insertOne(item);       
        req.flash('success', 'Complete, save item');
        res.redirect('/orders')
    } catch (e) {
        console.log(e);
        req.flash('err', 'Error ,save item');
        res.redirect('/orders')
    }        
});
/******************************** 
* 
*********************************/
router.get('/show/:id', function(req, res) {
console.log(req.params.id  );
    res.render('orders/show', {"params_id": req.params.id });
});
/******************************** 
* 
*********************************/
router.get('/edit/:id',async function(req, res) {
console.log(req.params.id  );
    const collection = await LibMongo.get_collection("orders" )
    var where = { _id: new ObjectID(req.params.id) }
    var task = await collection.findOne(where)
    res.render('orders/edit', {task: task });
});
/******************************** 
* 
*********************************/
router.post('/delete', async function(req, res, next) {
    try{
        var data = req.body
console.log(data )  
        var id = data.id
        const collection = await LibMongo.get_collection("orders" )
        var where = { "_id": new ObjectID( id ) };
        await collection.deleteOne(where)
       req.flash('success', 'Complete, delete item');
       res.redirect('/orders')
    } catch (e) {
        console.log(e);
        req.flash('err', 'Error ,save task');
        res.redirect('/orders')
    }        
});
/******************************** 
* 
*********************************/
router.get('/import_task', function(req, res, next) {
    res.render('orders/import_task', {});
});
/******************************** 
* 
*********************************/
router.get('/test', function(req, res, next) {
    res.render('orders/test', {});
});   
  
module.exports = router;
