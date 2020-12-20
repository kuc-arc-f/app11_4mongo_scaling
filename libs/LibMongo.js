// LibMongo
const MongoClient = require('mongodb').MongoClient;

//
export default {
    init:function(){
        this.dbName = "db1"
//        this.url = "mongodb://localhost:27017"
        this.url = "mongodb://localhost:27018"
    },        
    /*
    get_db: function(url, dbName, collectionName ){
        try{
            let client = await MongoClient.connect(url);
            const db = client.db(dbName);
            return db
        } catch (err) {
            console.log(err);
            return false;
        }
    },
    */
   get_collection:async function(collectionName ){
        try{
            this.init()
            let client = await MongoClient.connect( this.url);
            const db = client.db( this.dbName);
            const collection = db.collection(collectionName);
            return collection
        } catch (err) {
            console.log(err);
            throw new Error('Error, get_collection');
            //return false;
        }
    },
    get_collection_mongo2:async function(collectionName ){
        try{
            var url = "mongodb://mongo2:27017"
            this.init()
            let client = await MongoClient.connect(  url);
            const db = client.db( this.dbName);
            const collection = db.collection(collectionName);
            return collection
        } catch (err) {
            console.log(err);
            throw new Error('Error, get_collection');
            //return false;
        }
    },
    aa:function(){
        var ret = [];
        return ret;        
    },
  

}