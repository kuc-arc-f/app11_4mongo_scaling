var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
const { performance } = require('perf_hooks');
import moment from 'moment'

import LibMongo from "../libs/LibMongo"
import LibPagenate from "../libs/LibPagenate"
import LibReportBreads from "../libs/LibReportBreads"

/******************************** 
* 
*********************************/
router.get('/index', async function(req, res) {
    try{
        var t0 = performance.now();
        var bread_orders = []
        const collection = await LibMongo.get_collection("bread_orders" )
        var page = req.query.page;
        LibPagenate.init();
        var page_info = LibPagenate.get_page_start(page);       
console.log( "page=",  page, page_info ); 
        await collection.aggregate([
            {$sort: {created_at: -1} },
            /*
            {
                $lookup: {
                    from: "breads",
                    localField: "bread_id",
                    foreignField: "_id",
                    as: "breads"
                }
            },
            */
            {
                $group : { _id: "$bread_id", num_total: { $sum : "$order_num" }} 
            }

        ]).toArray().then((docs) => {
            bread_orders = docs
console.log(bread_orders);
        })
        var t1 = performance.now();
console.log("Call to function took= " + (t1 - t0) + " milliseconds.");
        var bread_ids = await LibReportBreads.get_bread_ids(bread_orders)
//console.log(bread_ids);
        var breads = await LibReportBreads.get_bread_items(bread_ids)
        var report_items = await LibReportBreads.get_report_items(breads , bread_orders)
// console.log(report_items);
        var param = LibPagenate.get_page_items(report_items )
//        var t2 = performance.now();
//console.log("Call to function took 2= " + (t2 - t0) + " milliseconds.");
        res.json(param);
    } catch (err) {
        console.log(err);
        res.status(500).send();    
    }   
});
/******************************** 
* 
*********************************/
router.get('/index_month', async function(req, res) {
    try{
        var bread_orders = []
        const collection = await LibMongo.get_collection("bread_orders" )
        var page = req.query.page;
        LibPagenate.init();
        var page_info = LibPagenate.get_page_start(page); 
        var bread_orders =await LibReportBreads.get_month_items()
console.log(bread_orders);
        var bread_ids = await LibReportBreads.get_bread_ids(bread_orders)
        var breads = await LibReportBreads.get_bread_items(bread_ids)
        var report_items = await LibReportBreads.get_report_items(breads , bread_orders)
// console.log(report_items);
        var param = LibPagenate.get_page_items(report_items )
        res.json(param);
    } catch (err) {
        console.log(err);
        res.status(500).send();    
    }   
});
/******************************** 
* 
*********************************/
router.get('/index_week', async function(req, res) {
    try{
        var bread_orders = []
        const collection = await LibMongo.get_collection("bread_orders" )
        var page = req.query.page;
        LibPagenate.init();
        var page_info = LibPagenate.get_page_start(page);       
       var bread_orders =await LibReportBreads.get_week_items()
console.log(bread_orders);
        var bread_ids = await LibReportBreads.get_bread_ids(bread_orders)
        var breads = await LibReportBreads.get_bread_items(bread_ids)
        var report_items = await LibReportBreads.get_report_items(breads , bread_orders)
// console.log(report_items);
        var param = LibPagenate.get_page_items(report_items )
        res.json(param);
    } catch (err) {
        console.log(err);
        res.status(500).send();    
    }   
});
/******************************** 
* 
*********************************/
router.get('/tasks_test', function(req, res) {
});


module.exports = router;
