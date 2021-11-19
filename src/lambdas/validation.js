var validator = require('validator');

module.exports.isPin=function(pin){
    return (typeof(pin)==='string' && /^[0-9]{5}$/.test(pin))
}

module.exports.isPinAssertionsObject = {
    functionName:"isPin",
    assertions: [
        [null,false,'null is not a Pin'],
        [undefined,false,'undefined is not a Pin'],
        [12345,false,'number 12345 is not a Pin'],
        ["",false,'"" is not a Pin'],
        ['aaaaa',false,'aaaaa is not a Pin'],
        ['123456',false,'123456 is not a Pin'],
        ['1234',false,'1234 is not a Pin'],
        ['00000',true,'00000 is a Pin'],
        ['12121',true,'12121 is a Pin']
    ]
}

module.exports.isAppId=function(appid){
    return (typeof(appid)==='string' && /^[A-Za-z0-9_-]{21}$/.test(appid)) //per nanoid definition
}

module.exports.isAppIdAssertionsObject = {
    functionName:"isAppId",
    assertions: [
        [null,false,'null is not an appId'],
        [undefined,false,'undefined is not an appId'],
        [12345,false,'number 12345 is not an appId'],
        ["",false,'"" is not an appId'],
        ['aaaaaaaaaaaaaaaaaaaaaa',false,'aaaaaaaaaaaaaaaaaaaaaa is not an appId'], //too long
        ['aaaaaaaaaaaaaaaaaaaa',false,'aaaaaaaaaaaaaaaaaaaa is not an appId'], //too short
        ['*********************',false,'********************* is not an appId'], //wrong chars
        ['9Wu-dMpZnS2jzEqR_9I1w',true,'9Wu-dMpZnS2jzEqR_9I1w is an appId'],
        ['kWwKxbI-a_8pXHuQUt9Gc',true,'kWwKxbI-a_8pXHuQUt9Gc is an appId']
    ]
}

module.exports.isToken=function(token){
    return (typeof(token)==='string' && token.length>=32 && token.length<=64 && validator.isBase64(token))
}

module.exports.isTokenAssertionsObject = {
    functionName:"isToken",
    assertions: [
        [null,false,'null is not a token'],
        [undefined,false,'undefined is not a token'],
        [12345,false,'number 12345 is not a token'],
        ["",false,'"" is not a token'],
        ['aaaaaaaaaaaaaaaaaaaaaa',false,'aaaaaaaaaaaaaaaaaaaaaa is not a token'], //too short
        ['aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',false,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa is not a token'], //too long
        ['aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@',false,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@ is not a token'], //wrong chars
        ['aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',true,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa is a token'],
        ['YWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYQ==',true,'YWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYQ== is a token']
    ]
}