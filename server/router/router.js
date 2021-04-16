const router = require('express').Router()
const express =require('express')
const path = require('path')
const {genSalt,validPassword} =require('../lib/hashUtility');
const sendEmail  = require('../email_config/node_mailer');
const {insertRecord , fetchRecord , updateRecord ,fetchRecordByEmail} = require('../db_connection/mongooseOperation');
const {jwtSign,jwtVerify} = require('../JWT/jwtToken')
const dotenv = require('dotenv');

dotenv.config();


router.post('/register', (req,res)=>{
        
        const senderEmail= req.body.email;
        const userObject=req.body;
        const salt = genSalt(); //generate an random 32 bytes string from crypo library
        
        const user = insertRecord(userObject,salt) // insert user details in the mongodb in UserDetail collection
        user.then(data =>                         // with status as pending which means email is not verified yet
                {
                console.log(data);
                let link=`http://${req.hostname}:5000/verify/${salt}/${data.id}`;
                const content= `<h1> Please verify your email id </h1><br>
                <p> click on the link below to verify email</p><br>
                <a href=${link}> Click here </a>`;
                sendEmail(content,senderEmail)            // Send an email to the user to verify his emailid.
                .then(data => res.send({success:data}))
                .catch(err=>console.log(err))
                }
        )

        
})

router.get('/verify/:hasValue/:userid',(req,res)=>{
        const userId= req.params.userid;
        const salt= req.params.hasValue;
        
        const user = fetchRecord(userId,salt); //fetch user record based on the provided email salt and userid params
        user.then(data=>{
                console.log(data)
                if (data.salt === salt){
                      res.redirect(`/generatepassword?user=${userId}&salt=${salt}`)         
                }
                else{
                        res.sendStatus(403)
                }
        })
        
})

router.get('/generatepassword', (req,res)=>{
        //req.userid= req.query.user;
        res.sendFile(path.join(__dirname,"../../client/verify.html"));
})


router.post('/generatepassword', (req,res)=>{
        const userObject= req.body;
        console.log(userObject)
        const user= updateRecord(userObject); // updated the table with password field 
        user.then(data=> {                    // and changed the status as completed
                res.send(data);
        });
})


router.get('/register', (req,res)=>{
       res.sendFile(path.join(__dirname,'../../client/Register.html') );
})

router.get('/login', (req,res)=>{
        res.sendFile(path.join(__dirname,'../../client/login.html') );
 })

 router.post('/login', (req,res)=>{
        
        const userObject= req.body;   
        const {email, pass}= userObject
       
        const user = fetchRecordByEmail(email) //fetch user detail by the provided emailid
        user.then(data=>{
                if(data.status==="completed")
                {
                        const successValue =validPassword(pass,data.password,data.salt); // check the enter password is correct 
                        //console.log(successValue)
                        if(successValue)
                        { 
                                const token= jwtSign(userObject) // generate an token 
                                console.log('login route page '+token)
                                res.send({data:token,success:successValue}); // send token as an response
                        }
                        else{
                                res.send({data:false})    
                        }
                }
                else
                {
                        res.send({data:false})    
                } 
        }).catch(err=>console.log(err))
          
})

const checker = (req,res,next)=>{
        const header = req.headers['authorization'];
        console.log('checker router'+header)
        if(typeof header !== 'undefined') {
                const bearer = header.split(' ');
                const token = bearer[1];
                console.log('inside checker route'+token)
                req.token = token;
                next();
                
            } else {
                //If header is undefined return Forbidden (403)
                res.sendStatus(403)
            }
}

// checker function is used to check whether the route headers has access token or not.
// if access token is present redirect them to user homepage else give forbidden error.
router.get('/detail',checker, (req,res)=>{
        
        const verifyObject= jwtVerify(req) // verify the token 
        console.log(verifyObject)
        if(Object.keys(verifyObject).length!=0){ //if user object is present send response has success
                res.send({success:true})
        }

 })

router.get('/protectedRoute', (req,res)=>{
        res.sendFile(path.join(__dirname,'../../client/details.html') )
})

router.get('/display', (req,res)=>{
        res.sendFile(path.join(__dirname,'../../client/display.html') )
})

module.exports= router;