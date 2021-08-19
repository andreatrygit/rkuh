export function toughCookie(key,value,maxAge=180){
    return '__Host-' + key + '=' + value + '; path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=' + maxAge.toString();
}