const isBase64 = require('validator/lib/isBase64');

function isPin(pin){
    return pin && typeof(pin)==='string' && /^[0-9]{5}$/.test(pin)
}

function isAppId(appid){
    return appid && typeof(appid)==='string' && /^[A-Za-z0-9_-]{21}$/.test(appid) //per nanoid definition
}

function isToken(token){
    return token && typeof(token)==='string' && token.length>=32 && isBase64(token)
}