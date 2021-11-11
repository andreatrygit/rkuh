const {isBase64} = require('validator/lib/isEmail');

module.exports.isPin=function(pin){
    typeof(pin)==='string' && /^[0-9]{5}$/.test(pin)
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
        ['00000',true,'00000'],
        ['12121',true,'12121']
    ]
}

module.exports.isAppId=function(appid){
    typeof(appid)==='string' && /^[A-Za-z0-9_-]{21}$/.test(appid) //per nanoid definition
}

module.exports.isToken=function(token){
    typeof(token)==='string' && token.length>=32 && token.length<=64 && isBase64(token)
}