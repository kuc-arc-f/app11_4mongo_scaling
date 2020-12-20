
// LibTasks
//const {promisify} = require('util');
import LibMongo from "../libs/LibMongo"

//
export default {
    get_serach_items :function(items, key){
        try{
            var data =[]
            var max = 1000
            items.forEach(function(item){
//console.log( item.title , key )
                if ( item.title.indexOf(key) != -1 ) {
                    console.log(data.length)
                    if(data.length < max){
                        data.push(item)
                   }
                }
            });        
            return data            
        } catch (e) {
            console.log(e);
            return null;
        }      
    },
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

}
