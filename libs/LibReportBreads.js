
// LibOrders
import LibMongo from "../libs/LibMongo"
var ObjectID = require('mongodb').ObjectID;
import moment from 'moment'

//
export default {
    get_bread_ids :async function(items){
        try{
            var ret = []
            items.forEach(async function (item) {
//                    console.log( item.breads[0]._id )
                ret.push( item._id )
/*
                if(item.breads.length > 0){
                    ret.push( item.breads[0]._id )
                }
*/
            });
            return ret;  
        } catch (e) {
            console.log(e);
            throw new Error('Error , get_bread_ids');
        }         
    },
    get_bread_items :async function(oid_items){
        try{
            var ret = []
            const collection = await LibMongo.get_collection("breads" )
            await collection.find(
                {
                    _id: {$in : oid_items }                
                }            
            ).toArray().then((docs) => {
                ret = docs
//                console.log(docs);
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
//console.log( order_item._id.toString() )
                    if( item._id.toString() === order_item._id.toString()){
//                        console.log( order_item )
                        item.order_num = order_item.num_total ;
                    }
                });
                ret.push(item)
            });
            return ret;  
        } catch (e) {
            console.log(e);
            throw new Error('Error , get_bread_ids');
        } 
    },
    get_month_items :async function(){
        try{
            var ret = []
            var start = moment().startOf('month').toDate()
            const collection = await LibMongo.get_collection("bread_orders" )
            await collection.aggregate([
                { $match: { "created_at": {$gte: start } } 
                },
                {
                    $group : { _id: "$bread_id", num_total: { $sum : "$order_num" }} 
                }
            ]).toArray().then((docs) => {
                ret = docs
            })            
            return ret;  
        } catch (e) {
            console.log(e);
            throw new Error('Error , get_month_items ');
        } 
    },
    get_week_items :async function(){
        try{
            var ret = []
            var start = moment().startOf('week').toDate()
            const collection = await LibMongo.get_collection("bread_orders" )
            await collection.aggregate([
                { $match: { "created_at": {$gte: start } } 
                },
                {
                    $group : { _id: "$bread_id", num_total: { $sum : "$order_num" }} 
                }
            ]).toArray().then((docs) => {
                ret = docs
            })            
            return ret;  
        } catch (e) {
            console.log(e);
            throw new Error('Error , get_week_items ');
        }
    },


}
