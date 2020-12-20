var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
const { performance } = require('perf_hooks');

import LibMongo from "../libs/LibMongo"
import LibPagenate from "../libs/LibPagenate"
import LibReportCategory from "../libs/LibReportCategory"

/******************************** 
* 
*********************************/
router.get('/index', async function(req, res) {
    try{
        var bread_orders = []
        const collection = await LibMongo.get_collection("bread_orders" )
        var page = req.query.page;
        LibPagenate.init();
        var page_info = LibPagenate.get_page_start(page);       
        await collection.aggregate([
            {$sort: {created_at: -1} },
            {
                $group : { _id: "$bread_id", num_total: { $sum : "$order_num" }} 
            }

        ]).toArray().then((docs) => {
            bread_orders = docs
//console.log(bread_orders);
        })
        var bread_ids = await LibReportCategory.get_bread_ids(bread_orders)
//console.log(bread_ids);
        var bread_category = await LibReportCategory.get_bread_items(bread_ids) 
//console.log(bread_category );
        var category_ids = await LibReportCategory.get_category_ids( bread_category )
//console.log(category_ids );
        var category_items = await LibReportCategory.get_category_items( category_ids )
//console.log(category_items );
        var report_items = await LibReportCategory.get_report_items(bread_category , bread_orders)
//console.log(report_items);
        var report_category = await LibReportCategory.get_report_category(category_items, report_items)
//console.log(report_category);        
        var param = LibPagenate.get_page_items(report_category )
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
