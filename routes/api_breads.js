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
        const collection = await LibMongo.get_collection("breads" )
        var page = req.query.page;
        LibPagenate.init();
        var page_info = LibPagenate.get_page_start(page);       
console.log( "page=",  page, page_info ); 
        collection.aggregate([
            {$skip: page_info.start },
            {$limit: page_info.limit },
            {$sort: {created_at: -1} },
            {
                $lookup: {
                    from: "type",
                    localField: "type_id",
                    foreignField: "_id",
                    as: "types"
                }
            },
            {
                $lookup: {
                    from: "category",
                    localField: "category_id",
                    foreignField: "_id",
                    as: "category"
                }
            }

        ]).toArray().then((docs) => {
console.log(docs);
            var param = LibPagenate.get_page_items(docs )
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
router.get('/show/:id', async function(req, res) {
console.log(req.params.id  );
    try{
        const collection = await LibMongo.get_collection("breads" )
        collection.aggregate([
        { $match: { "_id": new ObjectID(req.params.id) } },
        {
            $lookup: {
                from: "category",
                localField: "category_id",
                foreignField: "_id",
                as: "categories"
            },
        },
        {
            $lookup: {
                from: "type",
                localField: "type_id",
                foreignField: "_id",
                as: "types"
            },
        },{
            $lookup: {
                from: "tags",
                localField: "tag_id",
                foreignField: "_id",
                as: "tags"
            },            
        }
        ]).toArray().then((docs) => {
//console.log(docs[0]);
            var param = {"docs": docs[0] };
            res.json(param);
        })        
    } catch (err) {
        console.log(err);
        res.status(500).send();    
    }    
});
/*
router.get('/tasks_delete/:id',async function(req, res) {
    try{
        const collection = await LibMongo.get_collection("orders" )
        var where = { "_id": new ObjectID( req.params.id ) };
        await collection.deleteOne(where)
        res.json({id: req.params.id });
    } catch (err) {
        console.log(err);
        res.status(500).send();    
    }    
});
*/
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
