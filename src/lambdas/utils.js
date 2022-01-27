const assert = require('assert/strict');
const  crypto  = require('crypto');


module.exports.toughCookie = function(key,value,maxAge=null){//cookies are session by default
    return "__Host-" + key + "=" + (value ? value : '') + "; path=/; Secure; HttpOnly; SameSite=Strict" + (maxAge ? ("; Max-Age=" + maxAge.toString()) : '');
}


function makeTokenPair(){

    const keyBytes = Buffer.from(process.env.TOKEN_AES256_KEY_32BYTES_BASE64,'base64');
    const ivBytes = Buffer.from(process.env.TOKEN_AES256_INIT_VECT_16BYTES_BASE64,'base64');
    const cipher = crypto.createCipheriv("aes256",keyBytes, ivBytes);

    const tokenValueBytes = crypto.randomBytes(16);
    const antiForgeryBytes = Buffer.from(process.env.TOKEN_ANTI_FORGERY_KEY_16BYTES_BASE64,'base64');
    const valueToEncryptBytes = Buffer.concat([tokenValueBytes,antiForgeryBytes]);
    
    const encryptedBytes = Buffer.concat([cipher.update(valueToEncryptBytes),cipher.final()]);
    return [encryptedBytes.toString('base64'),tokenValueBytes.toString('base64')];
}

module.exports.makeTokenPair = makeTokenPair;

function redeemToken(token){

    const keyBytes = Buffer.from(process.env.TOKEN_AES256_KEY_32BYTES_BASE64,'base64');
    const ivBytes = Buffer.from(process.env.TOKEN_AES256_INIT_VECT_16BYTES_BASE64,'base64');
    const decipher = crypto.createDecipheriv("aes256",keyBytes, ivBytes);

    var decryptedBytes;
    
    const encryptedBytes = Buffer.from(token,"base64");
    try {
        decryptedBytes = Buffer.concat([decipher.update(encryptedBytes),decipher.final()]);
    } catch (error) {
        return [null,false]//in case decryption fails        
    }

    const tokenValueBytes = decryptedBytes.slice(0,16);
    const antiforgeryCandidateBytes = decryptedBytes.slice(16,32);
    const antiForgeryBytes = Buffer.from(process.env.TOKEN_ANTI_FORGERY_KEY_16BYTES_BASE64,'base64');

    if (antiforgeryCandidateBytes.equals(antiForgeryBytes)){
        return [tokenValueBytes.toString("base64"),true];
    }
    else{
        return [null, false];
    }
}

module.exports.redeemToken=redeemToken;

module.exports.testIntegrationTokenEncDec = function(){
    [encrypted,plain] = makeTokenPair();
    console.log('\t\tTesting encryption: from ' + plain + ' to ' + encrypted);
    assert.notDeepStrictEqual(plain,encrypted);
    [decrypted, success] = redeemToken(encrypted);
    console.log('\t\tTesting token decryption is succesful: ' + success);
    assert.deepStrictEqual(success,true);
    console.log('\t\tTesting decrypted equals plain: ' + decrypted + ' was ' + plain);
    assert.deepStrictEqual(decrypted,plain);

    [encrypted2,plain2] = makeTokenPair();
    console.log('\t\tTesting two randomic plaitexts are generated different: ' + plain + ' and ' + plain2);
    assert.notDeepStrictEqual(plain,plain2);
   
}
