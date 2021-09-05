export function toughCookie(key,value,maxAge=180){
    return "__Host-" + key + "=" + (value ? value : '') + "; path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=" + maxAge.toString();
}


export function makeToken(){
    const { nanoid } = require('nanoid');
    const tokenValue = nanoid();
    const valuetoEncrypt = tokenValue + '###' + process.env.TOKEN_ANTI_FORGERY_KEY_BASE64;

    const { buffer } = require('buffer');
    const byteKey = buffer.from(process.env.TOKEN_AES256_KEY_BASE64,'base64');
    const byteIv = buffer.from(process.env.TOKEN_AES256_INIT_VECT_BASE64,'base64');

    const { crypto } = require('crypto');
    const cipher = crypto.createCipheriv("aes256", byteKey, byteIv);
    cipher.update(valuetoEncrypt,'utf-8','utf-8');
    return cipher.final('utf-8');
}