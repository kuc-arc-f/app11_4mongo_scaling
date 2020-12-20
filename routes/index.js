var express = require('express');
var router = express.Router();

const collectionName = 'tasks';

//
import LibMongo from "../libs/LibMongo"
import LibAuth from "../libs/LibAuth"

//  res.send('respond with a resource-1234');
/******************************** 
* 
*********************************/
router.get('/', function(req, res, next) {
    try{
        var user = LibAuth.get_user(req)
        var mail = null
        var valid_login = false
        if(user != null){
            valid_login = true
            mail = user.mail
//            console.log(user.password );
        }
        var base_items = { valid_login: valid_login }
        res.render('index', { 
            mail: mail ,
            base_items: base_items,
        });
    } catch (e) {
        console.log(e);
    }    
});
/******************************** 
* 
*********************************/
router.get('/logout', function(req, res) {
    res.clearCookie('user');
    res.redirect('/');
});
/******************************** 
* 
*********************************/
router.get('/test1', async function(req, res, next) {
    try{
        const collection = await LibMongo.get_collection(collectionName )
        var item = { 
            "title": "t4",
            "content": "c1",
        };        
        await collection.insertOne(item);

        res.send('respond with a resource-11');
    } catch (err) {
        console.log(err);
        res.status(500).send();    
    }
//  res.render('index.ejs', { title: 'Express'});
});
//
router.get('/test2', async function(req, res, next) {
    try{
        const collection = await LibMongo.get_collection(collectionName )
        collection.find().sort({created_at: -1}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.send( result );
        });    
    } catch (err) {
        console.log(err);
        res.status(500).send();    
    }
});
// show
router.get('/test3', async function(req, res, next) {
    try{
        const collection = await LibMongo.get_collection(collectionName )
        collection.findOne({title: "t1"} ,function(err, result) {
            if (err) throw err;
            console.log(result);
        });
        res.send('respond with a resource-11');
    } catch (err) {
        console.log(err);
        res.status(500).send();    
    }
});
// update
router.get('/test4', async function(req, res, next) {
    try{
        const collection = await LibMongo.get_collection(collectionName )
        var item = { 
            "title": "t4",
            "content": "c2aaa",
        };        
        var where = {title: "t4"};
//        await collection.updateOne(where, item)
        await collection.updateOne(where, { $set: item })

        res.send('respond with a resource-11');
    } catch (err) {
        console.log(err);
        res.status(500).send();    
    }
});
// delete
router.get('/test5', async function(req, res, next) {
    try{
        const collection = await LibMongo.get_collection(collectionName )
        var where = {title: "t3"};
        await collection.deleteOne(where)

        res.send('respond with a ,delete');
    } catch (err) {
        console.log(err);
        res.status(500).send();    
    }
});

module.exports = router;
