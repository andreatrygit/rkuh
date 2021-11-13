var validator = require('validator');

module.exports.isPin=function(pin){
    return (typeof(pin)==='string' && /^[0-9]{5}$/.test(pin))
}

module.exports.isPinAssertionsObject = {
    functionName:"isPin",
    assertions: [
        [null,false,'null'],
        [undefined,false,'undefined'],
        [12345,false,'number 12345'],
        ["",false,'""'],
        ['aaaaa',false,'aaaaa'],
        ['123456',false,'123456'],
        ['1234',false,'1234'],
        ['00000',true,'00000'],
        ['12121',true,'12121']
    ]
}

module.exports.isAppId=function(appid){
    return (typeof(appid)==='string' && /^[A-Za-z0-9_-]{21}$/.test(appid)) //per nanoid definition
}

module.exports.isAppIdAssertionsObject = {
    functionName:"isAppId",
    assertions: [
        [null,false,'null'],
        [undefined,false,'undefined'],
        [12345,false,'number 12345'],
        ["",false,'""'],
        ['aaaaaaaaaaaaaaaaaaaaaa',false,'aaaaaaaaaaaaaaaaaaaaaa'], //too long
        ['aaaaaaaaaaaaaaaaaaaa',false,'aaaaaaaaaaaaaaaaaaaa'], //too short
        ['*********************',false,'*********************'], //wrong chars
        ['9Wu-dMpZnS2jzEqR_9I1w',true,'9Wu-dMpZnS2jzEqR_9I1w'],
        ['kWwKxbI-a_8pXHuQUt9Gc',true,'kWwKxbI-a_8pXHuQUt9Gc']
    ]
}

module.exports.isToken=function(token){
    return (typeof(token)==='string' && token.length>=32 && token.length<=64 && validator.isBase64(token))
}

module.exports.isTokenAssertionsObject = {
    functionName:"isToken",
    assertions: [
        [null,false,'null'],
        [undefined,false,'undefined'],
        [12345,false,'number 12345'],
        ["",false,'""'],
        ['aaaaaaaaaaaaaaaaaaaaaa',false,'aaaaaaaaaaaaaaaaaaaaaa'], //too short
        ['aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',false,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'], //too long
        ['aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@',false,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@'], //wrong chars
        ['aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',true,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'],
        ['YWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYQ==',true,'YWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYQ==']
    ]
}