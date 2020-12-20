var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
const { performance } = require('perf_hooks');

import LibMongo from "../libs/LibMongo"
import LibTasks from "../libs/LibTasks"
import LibPagenate from "../libs/LibPagenate"

/******************************** 
* 
*********************************/
router.get('/tasks_index', async function(req, res) {
    try{
        const collection = await LibMongo.get_collection("tasks" )
        var page = req.query.page;
        LibPagenate.init();
        var page_info = LibPagenate.get_page_start(page);       
console.log( "page=",  page, page_info ); 
        var limit = {skip: page_info.start , limit: page_info.limit }
        collection.find({} , limit ).sort({created_at: -1}).toArray(function(err, result) {
            if (err) throw err;
//            console.log(result);
            var param = LibPagenate.get_page_items(result )
            res.json(param);
        });
    } catch (err) {
        console.log(err);
        res.status(500).send();    
    }   
});
/******************************** 
* 
*********************************/
router.post('/tasks_new', async function(req, res){
    try{
        var data = req.body;
        const collection = await LibMongo.get_collection("tasks" )
        var item = { 
            "title": data.title,
            "content": data.content,
            "created_at" : new Date()
        };        
        await collection.insertOne(item);
        res.json(req.body);
    } catch (err) {
        console.log(err);
        res.status(500).send();    
    }    
}); 
/******************************** 
* 
*********************************/
router.get('/tasks_show/:id', async function(req, res) {
console.log(req.params.id  );
    try{
        const collection = await LibMongo.get_collection("tasks" )
        var where = { _id: new ObjectID(req.params.id) }
        var task = await collection.findOne(where) 
        var param = {"docs": task };
        res.json(param);        
    } catch (err) {
        console.log(err);
        res.status(500).send();    
    }    
});
/******************************** 
* 
*********************************/
router.post('/tasks_update', async function(req, res){
    try{
        const collection = await LibMongo.get_collection("tasks" )
        var item = { 
            "title": req.body.title ,
            "content": req.body.content
        };           
        var where = {"_id": new ObjectID( req.body.id )};
        await collection.updateOne(where, { $set: item })
        res.json(req.body);
    } catch (err) {
        console.log(err);
        res.status(500).send();    
    }    
});
/******************************** 
* 
*********************************/
router.get('/tasks_delete/:id',async function(req, res) {
    try{
        const collection = await LibMongo.get_collection("tasks" )
        var where = { "_id": new ObjectID( req.params.id ) };
        await collection.deleteOne(where)
        res.json({id: req.params.id });
    } catch (err) {
        console.log(err);
        res.status(500).send();    
    }    
});
/******************************** 
* 
*********************************/
router.post('/file_receive', function(req, res, next) {
    let data = req.body
    var items = JSON.parse(data.data || '[]')
    var ret_arr = {ret:0, msg:""}
//console.log( items )
    var t0 = performance.now();
    var ret = LibTasks.add_items(items)
    var t1 = performance.now();
console.log("Call to function took= " + (t1 - t0) + " milliseconds.");

    if(ret){
        ret_arr.ret = 1
    }
    res.json(ret_arr);
});
/******************************** 
* 
*********************************/
router.get('/tasks_test', function(req, res) {
});


module.exports = router;
