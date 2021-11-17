module.exports.toughCookie = function(key,value,maxAge=180){
    return "__Host-" + key + "=" + (value ? value : '') + "; path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=" + maxAge.toString();
}


module.exports.makeTokenPair = function(){
    const  crypto  = require('crypto');
    const tokenValueBytes = crypto.randomBytes(16);

    const antiForgeryBytes = Buffer.from(process.env.TOKEN_ANTI_FORGERY_KEY_16BYTES_BASE64,'base64');
    
    const valuetoEncrypt = Buffer.concat([tokenValueBytes,antiForgeryBytes]);

    const keyBytes = Buffer.from(process.env.TOKEN_AES256_KEY_32BYTES_BASE64,'base64');
    const ivBytes = Buffer.from(process.env.TOKEN_AES256_INIT_VECT_16BYTES_BASE64,'base64');

    const cipher = crypto.createCipheriv("aes256",keyBytes, ivBytes);
    cipher.update(valuetoEncrypt);
    return [cipher.final('base64'),tokenValueBytes.toString('base64')];
}

module.exports.redeemToken = function(token){
    const crypto = require('crypto');
    const keyBytes = Buffer.from(process.env.TOKEN_AES256_KEY_32BYTES_BASE64,'base64');
    const ivBytes = Buffer.from(process.env.TOKEN_AES256_INIT_VECT_16BYTES_BASE64,'base64');
    const decipher = crypto.createDecipheriv("aes256",keyBytes, ivBytes);
    
    const tokenBytes = Buffer.from(token,"base64");
    decipher.update(tokenBytes);
    const valueDecryptedBytes = decipher.final();

    const tokenValueBytes = valueDecryptedBytes.slice(0,16);
    const antiforgeryCandidateBytes = valueDecryptedBytes.slice(16,32);

    const antiForgeryBytes = Buffer.from(process.env.TOKEN_ANTI_FORGERY_KEY_16BYTES_BASE64,'base64');

    if (antiforgeryCandidateBytes.equals(antiForgeryBytes)){
        return [tokenValueBytes.toString("base64"),true];
    }
    else{
        return [null, false];
    }
}

module.exports.testTokenEncDec = function(){
    console.log('\n\tTesting Token Encryption Decryption\n')
    [encrypted,plain] = makeTokenPair(); //1st run
    [decrypted, success] = redeemToken(encrypted);
    if (success && plain === decrypted) {console.log('\t\tOK at token EncDec test: ' + plain + ' -> ' + encrypted + ' -> ' + decrypted)}
    else {
        console.log('\t\tFAILS at token EncDec test: ' + plain + ' -> ' + encrypted + ' -> ' + decrypted)
        throw '\n!!! TESTS STOPPED !!!\n\n'
    } 
    [encrypted,plain] = makeTokenPair(); //2nd run 
    [decrypted, success] = redeemToken(encrypted);
    if (success && plain === decrypted) {console.log('\t\tOK at token EncDec test: ' + plain + ' -> ' + encrypted + ' -> ' + decrypted)}
    else {
        console.log('\t\tFAILS at token EncDec test: ' + plain + ' -> ' + encrypted + ' -> ' + decrypted)
        throw '\n!!! TESTS STOPPED !!!\n\n'
    } 
}