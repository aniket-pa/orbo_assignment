const crypto = require('crypto')

function genSalt(password='default'){
    const salt = crypto.randomBytes(32).toString('hex')
    
    return salt    
}

function genHash(password,salt){
    const hash = crypto.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex')
    
    return hash
}


//const obj= genPassword('aniket06')

function validPassword(password,hash,salt){
    const hassPass = crypto.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex')

    console.log('Function executed')
    console.log(hassPass)
    return hassPass === hash
}

/* const hash ='e3b3c6b5cdf3ceacfabccf5d618a63f3d994f682b8409562b187e10cb7394ba617a3c2233bef74765d8ff09364bec439d28e1a3848a059d1d5a7ba7df1d5ca01'
const salt ='5cd3e523fb6403a7eada55b1a817c4a31970e86877f1dfa63e24ffd509be120a'
const value = validPassword('aniket06',hash,salt)

console.log(value)  */


module.exports={genSalt,genHash,validPassword}