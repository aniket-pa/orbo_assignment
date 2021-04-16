const jwt = require('jsonwebtoken');

function jwtSign(){
    const payload={
        sub:'1234',
        name:'Aniket',
    }
    
    const token= jwt.sign(payload, 'privatekey', { expiresIn: '1h' });

    return token
}

const token= jwtSign()
console.log(token)

function jwtVerify(token3){
    console.log('Request token '+token3)
     const token2 =jwt.verify(token3, 'privatekey')

     return token2
    }

const token2= jwtVerify(token)

console.log(token2)