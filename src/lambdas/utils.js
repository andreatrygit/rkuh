export function toughCookie(key,value,maxAge=180){
    return "__Host-" + key + "=" + (value ? value : '') + "; path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=" + maxAge.toString();
}


export function makeTokenPair(){
    const { crypto } = require('crypto');
    const tokenValueBytes = crypto.randomBytes(16);

    const antiForgeryBytes = Buffer.from(process.env.TOKEN_ANTI_FORGERY_KEY_BASE64,'base64');
    
    const valuetoEncrypt = Buffer.concat([tokenValueBytes,antiForgeryBytes]);

    const keyBytes = Buffer.from(process.env.TOKEN_AES256_KEY_BASE64,'base64');
    const ivBytes = Buffer.from(process.env.TOKEN_AES256_INIT_VECT_BASE64,'base64');

    const cipher = crypto.createCipheriv("aes256",keyBytes, ivBytes);
    cipher.update(valuetoEncrypt);
    return (cipher.final('base64'),tokenValueBytes.toString('base64'));
}

export function redeemToken(token){
    const { crypto } = require('crypto');
    const keyBytes = Buffer.from(process.env.TOKEN_AES256_KEY_BASE64,'base64');
    const ivBytes = Buffer.from(process.env.TOKEN_AES256_INIT_VECT_BASE64,'base64');
    const decipher = crypto.createDecipheriv("aes256",keyBytes, ivBytes);
    
    const tokenBytes = Buffer.from(token,"base64");
    decipher.update(tokenBytes);
    const valueDecryptedBytes = decipher.final();

    const tokenValueBytes = valueDecryptedBytes.slice(0,16);
    const antiforgeryCandidateBytes = valueDecryptedBytes.slice(16,32);

    const antiForgeryBytes = Buffer.from(process.env.TOKEN_ANTI_FORGERY_KEY_BASE64,'base64');

    if (antiforgeryCandidateBytes.equals(antiForgeryBytes)){
        return(tokenValueBytes.toString("base64"),true);
    }
    else{
        return (null, false);
    }
}