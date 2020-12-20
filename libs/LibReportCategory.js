
// LibOrders
import LibMongo from "../libs/LibMongo"
var ObjectID = require('mongodb').ObjectID;

//
export default {
    get_bread_ids :async function(items){
        try{
            var ret = []
            items.forEach(async function (item) {
//                    console.log( item.breads[0]._id )
                ret.push( item._id )
            });
            return ret;  
        } catch (e) {
            console.log(e);
            throw new Error('Error , get_bread_ids');
        }         
    },
    get_bread_items :async function(bread_ids){
        try{
            var ret = []
            const bread_collection = await LibMongo.get_collection("breads" )
            await bread_collection.aggregate([
            { $match: { "_id": {$in : bread_ids } }},
            {
                $lookup: {
                    from: "category",
                    localField: "category_id",
                    foreignField: "_id",
                    as: "categories"
                }
            },
            /*
            {
                $group : { _id: "$category_id"} 
            }
            */
            ]).toArray().then((docs) => {
                ret = docs
//    console.log(ret);
            })           
            return ret;  
        } catch (e) {
            console.log(e);
            throw new Error('Error , get_bread_items');
        }         
    },
    get_report_items :async function(breads , bread_orders){
        try{
            var ret = []
            breads.forEach(async function (item) {
                bread_orders.forEach(async function (order_item){
                    if( item._id.toString() === order_item._id.toString()){
//                        console.log( order_item )
                        item.order_num = order_item.num_total ;
                    }
                });
                item.price_total = item.price * item.order_num;
//console.log( item )
                ret.push(item)
            });
            return ret;  
        } catch (e) {
            console.log(e);
            throw new Error('Error , get_bread_ids');
        } 
    },
    get_report_category :async function(category , report_items){
        try{
            var ret = []
            category.forEach(async function (item) {
//console.log( item._id.toString() )
                item.price_total = 0
                report_items.forEach(async function (report_item ){
                    if(report_item.categories.length > 0){
//console.log( report_item.categories[0] )
//console.log(report_item.price_total )
                        if( item._id.toString() === report_item.categories[0]._id.toString()){
                            item.price_total += report_item.price_total ;
                        }
                    }
                });
                ret.push(item)
            });
            return ret;  
        } catch (e) {
            console.log(e);
            throw new Error('Error , get_report_category');
        } 
    },
    get_category_ids :async function(items){
        try{
            var ret = []
            items.forEach(async function (item) {
                if(item.categories.length > 0){
//                    console.log( item.categories[0]._id )
                    ret.push( item.categories[0]._id )
                }
            });
            return ret;  
        } catch (e) {
            console.log(e);
            throw new Error('Error , get_category_ids');
        }         
    },
    get_category_items :async function(items){
        try{
            var ret = []
            const collection = await LibMongo.get_collection("category" )
            await collection.find(
            {
                _id: {$in : items }                
            }            
            ).toArray().then((docs) => {
                ret = docs
//                console.log(docs);
            })            
            return ret;            

        } catch (e) {
            console.log(e);
            throw new Error('Error , get_category_items');
        }         
    },


}
