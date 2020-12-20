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
    res.render('breads/index', {"page": page } );  
});
/******************************** 
* 
*********************************/
router.get('/add',async function(req, res, next) {
    try{
        LibCsrf.set_token(req, res) 
        const category_collection = await LibMongo.get_collection("category" )
        var categories = await category_collection.find({} ).toArray();
        const tags_collection = await LibMongo.get_collection("tags" )
        var tags = await tags_collection.find({} ).toArray();
        const type_collection = await LibMongo.get_collection("type" )
        var types = await type_collection.find({} ).toArray();

        console.log(categories);
        res.render('breads/new', { 
            categories: categories, tags: tags, types: types 
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
// console.log(data  )
        var item = {
            name: data.name,
            price : parseInt(data.price),
            category_id: new ObjectID( data.category_id) ,  
            type_id: new ObjectID( data.type_id ) ,  
            tag_id: new ObjectID( data.tag_id) ,  
            created_at: new Date(),
        };
        const collection = await LibMongo.get_collection("breads" )
        await collection.insertOne(item);       
        req.flash('success', 'Complete, save item');
        res.redirect('/breads')
    } catch (e) {
        console.log(e);
        req.flash('err', 'Error ,save item');
        res.redirect('/')
    }        
});
/******************************** 
* 
*********************************/
router.get('/show/:id', function(req, res) {
console.log(req.params.id  );
    res.render('breads/show', {"params_id": req.params.id });
});
/******************************** 
* 
*********************************/
router.post('/delete', async function(req, res, next) {
    try{
        var data = req.body
console.log(data )  
        var id = data.id
        const collection = await LibMongo.get_collection("breads" )
        var where = { "_id": new ObjectID( id ) };
        await collection.deleteOne(where)
       req.flash('success', 'Complete, delete item');
       res.redirect('/breads')
    } catch (e) {
        console.log(e);
        req.flash('err', 'Error ,save task');
        res.redirect('/breads')
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
