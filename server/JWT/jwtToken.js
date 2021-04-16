const jwt = require('jsonwebtoken');

function jwtSign(userObject){
    const payload={
        sub:userObject._id,
        name:userObject.firstname
    }
    
    const token= jwt.sign(payload, 'privatekey', { expiresIn: '1h' });

    return token
}

function jwtVerify({token}){
   console.log('Request token '+token)
    const user = jwt.verify(token, 'privatekey')
    
    return user
}

module.exports = {jwtSign,jwtVerify}
/* const payload={
    sub:'122334',
    name:'aniket',
}

const token = jwt.sign({payload}, 'privatekey', { expiresIn: '1h' });

const verifyToken= jwt.verify(token, 'privatekey')

console.log(token);

console.log(verifyToken); */