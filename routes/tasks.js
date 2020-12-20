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
/******************************** 
* 
*********************************/
res.render('tasks/index', {"page": page } );  
//  res.render('tasks/index', {});
});
/******************************** 
* 
*********************************/
router.get('/add', function(req, res, next) {
  LibCsrf.set_token(req, res) 
  res.render('tasks/new', {});
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
            title: data.title ,  
            content: data.content ,
            created_at: new Date(),
        };
        const collection = await LibMongo.get_collection("tasks" )
        await collection.insertOne(item);       
        req.flash('success', 'Complete, save task');
        res.redirect('/tasks')
    } catch (e) {
        console.log(e);
        req.flash('err', 'Error ,save task');
        res.redirect('/tasks')
    }        
});
/******************************** 
* 
*********************************/
router.get('/show/:id', function(req, res) {
console.log(req.params.id  );
    res.render('tasks/show', {"params_id": req.params.id });
});
/******************************** 
* 
*********************************/
router.get('/edit/:id',async function(req, res) {
console.log(req.params.id  );
    const collection = await LibMongo.get_collection("tasks" )
    var where = { _id: new ObjectID(req.params.id) }
    var task = await collection.findOne(where)
    res.render('tasks/edit', {task: task });
});
/******************************** 
* 
*********************************/
router.post('/update', async function(req, res, next) {
    try{
        var data = req.body
console.log(data )
        const collection = await LibMongo.get_collection("tasks" )
        var item = { 
            "title": req.body.title ,
            "content": req.body.content
        };           
        var where = {"_id": new ObjectID( req.body.id )};
        await collection.updateOne(where, { $set: item })
        req.flash('success', 'Complete, save task');
        return res.redirect('/tasks')
    } catch (e) {
        console.log(e);
        req.flash('err', 'Error ,save task');
        res.redirect('/tasks')
    }        
});
/******************************** 
* 
*********************************/
router.post('/delete', async function(req, res, next) {
    try{
        var data = req.body
// console.log(data )  
        var id = data.id
        const collection = await LibMongo.get_collection("tasks" )
        var where = { "_id": new ObjectID( id ) };
        await collection.deleteOne(where)
       req.flash('success', 'Complete, delete item');
       res.redirect('/tasks')
    } catch (e) {
        console.log(e);
        req.flash('err', 'Error ,save task');
        res.redirect('/tasks')
    }        
});
/******************************** 
* 
*********************************/
router.get('/import_task', function(req, res, next) {
    res.render('tasks/import_task', {});
});
/******************************** 
* 
*********************************/
router.get('/test', function(req, res, next) {
    res.render('tasks/test', {});
  });
  
module.exports = router;
