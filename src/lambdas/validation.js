const {isBase64} = require('validator/lib/isEmail');

module.exports.isPin=function(pin){
    return pin && typeof(pin)==='string' && /^[0-9]{5}$/.test(pin)
}

module.exports.isAppId=function(appid){
    return appid && typeof(appid)==='string' && /^[A-Za-z0-9_-]{21}$/.test(appid) //per nanoid definition
}

module.exports.isToken=function(token){
    return token && typeof(token)==='string' && token.length>=32 && isBase64(token)
}