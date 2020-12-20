// LibAuth
const bcrypt = require('bcrypt');
const {promisify} = require('util');

import LibCookie from "../libs/LibCookie"
import LibMongo from "../libs/LibMongo"

//
export default {
    get_user:function(req){
        var ret = [];
        var user_json = req.cookies.user;
        var user = null
        if(user_json != null ){
          user = JSON.parse(user_json || '[]')
//          console.log(user_json);
//          console.log(user.password );
        }        
        return user;        
    },
    valid_user:function(req){
        var ret = false;
        var user_json = req.cookies.user;
        if(user_json != null ){
            console.log( user_json )
            ret = true;
        }          
        return ret;
    },
    validUserAuth:async function(res , mail, password ){
        try{
            var ret = false
            const collection = await LibMongo.get_collection("users" )
            var where = { mail: mail }
            var user = await collection.findOne(where) 
console.log("user:", user  )            
            if(user != null){
                if(bcrypt.compareSync( password,  user.password )){
                    ret = true
                    var json = JSON.stringify( user );
                    LibCookie.set_cookie(res, 'user', json)                    
                }
            }           
            return ret
        } catch (e) {
            console.log(e);
            return false
        }   
    },        

}