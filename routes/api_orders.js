var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
const { performance } = require('perf_hooks');

import LibMongo from "../libs/LibMongo"
import LibOrders from "../libs/LibOrders"
import LibPagenate from "../libs/LibPagenate"

/******************************** 
* 
*********************************/
router.get('/index', async function(req, res) {
    try{
        var t0 = performance.now();
        const collection = await LibMongo.get_collection("orders" )
        var page = req.query.page;
        LibPagenate.init();
        var page_info = LibPagenate.get_page_start(page);       
console.log( "page=",  page, page_info );
        var limit = {skip: page_info.start , limit: page_info.limit }
        var docs= await collection.find({} , limit ).sort({created_at: -1}).toArray()

//console.log(docs)
        const collection_2 = await LibMongo.get_collection_mongo2("books" )
        var books = await collection_2.find({}).toArray()
// console.log(books)
        var order_items = LibOrders.get_order_items(docs , books)
        var t1 = performance.now();
//console.log(order_items)

console.log("Call to function took= " + (t1 - t0) + " milliseconds.");
        var param = LibPagenate.get_page_items(order_items )
//console.log(param.docs )
        res.json(param);
/*
        collection.aggregate([
            {$skip: page_info.start },
            {$limit: page_info.limit },
            {$sort: {created_at: -1} },
            {
                $lookup: {
                    from: "books",
                    localField: "book_id",
                    foreignField: "_id",
                    as: "book"
                }
            }
        ]).toArray().then((docs) => {
console.log(docs);
            var param = LibPagenate.get_page_items(docs )
            res.json(param);
        })
*/
    } catch (err) {
        console.log(err);
        res.status(500).send();    
    }   
});

/******************************** 
* 
*********************************/
router.get('/show/:id', async function(req, res) {
console.log(req.params.id  );
    try{
        const collection = await LibMongo.get_collection("orders" )
        collection.aggregate([
        { $match: { "_id": new ObjectID(req.params.id) } },
        {
            $lookup: {
                from: "books",
                localField: "book_id",
                foreignField: "_id",
                as: "book"
            }
        }]).toArray().then((docs) => {
//console.log(docs[0]);
            var param = {"docs": docs[0] };
            res.json(param);
        })        
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
console.log( items )
//    var t0 = performance.now();
    var ret = LibOrders.add_items(items)
//    var t1 = performance.now();
//console.log("Call to function took= " + (t1 - t0) + " milliseconds.");

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
