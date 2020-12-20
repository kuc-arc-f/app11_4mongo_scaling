// LibCookie

//
export default {
    set_cookie:function(res, key, value){
        res.cookie(key , value, {
            //生存期間( msec )
            maxAge: 365 * 24 * 60 *  60 * 1000,
            httpOnly: false
        })
    },

}