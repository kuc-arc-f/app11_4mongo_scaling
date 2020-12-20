
// LibSortedTasks

const {promisify} = require('util');
import LibMongo from "../libs/LibMongo"

//
export default {
    /*
    add_items :async function(items){
        try{
            const collection = await LibMongo.get_collection("tasks" )
            items.forEach(async function (item) {
                var item = { 
                    "title": item.title,
                    "content": item.content,
                    "created_at" : new Date()
                };        
                await collection.insertOne(item);                
            });
            return true;  
        } catch (e) {
            console.log(e);
            return false;
        }      
    },
    */
}
