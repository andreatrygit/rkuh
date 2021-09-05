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

}