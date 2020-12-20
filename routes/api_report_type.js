var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
const { performance } = require('perf_hooks');

import LibMongo from "../libs/LibMongo"
import LibPagenate from "../libs/LibPagenate"
import LibReportCategory from "../libs/LibReportCategory"
import LibReportType from "../libs/LibReportType"

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
// console.log(bread_orders);
        })
        var bread_ids = await LibReportCategory.get_bread_ids(bread_orders)
//console.log(bread_ids);
        var bread_type = await LibReportType.get_bread_items(bread_ids) 
//console.log(bread_type );
        var type_ids = await LibReportType.get_type_ids(bread_type)
//console.log(type_ids );
        var type_items = await LibReportType.get_type_items(type_ids)
// console.log(type_items );
        var report_items = await LibReportType.get_report_items(bread_type , bread_orders)
//console.log(report_items );
        var report_type = await LibReportType.get_report_types( type_items, report_items)
console.log(report_type );
        var param = LibPagenate.get_page_items(report_type )
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
