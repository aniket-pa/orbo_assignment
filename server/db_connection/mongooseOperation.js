const mongoose = require('mongoose');
const connection = require('./moongooseConnection');
const UserDetail = connection.models.UserDetail;
const {genHash} = require('../lib/hashUtility');
const { createHmac } = require('crypto');


function insertRecord(userObject,salt){
        const newUser = new UserDetail({
            firstname:userObject.firstname,
            lastname:userObject.lastname,
            phone:userObject.phone,
            salt:salt,
            email:userObject.email,
        })

       const user=newUser.save();

    return user;
}

async function updateRecord(userObject){
    const hashValue= genHash(userObject.pass,userObject.salt);
    //const hashValue=hashObject.hash;
    console.log(hashValue)
    const myQuery={_id:userObject.userid}
    const newValues={$set:{status:'completed',password:hashValue}}
    
    try{
    const user =await  UserDetail.updateOne(myQuery,newValues)
    return user
    }
    catch(err)
    {
        return err
    }
      
    
}

async function fetchRecord(userId, salt){
    try{
    const user = await UserDetail.findOne({_id:userId})
    return user;
    }
    catch(err){
    return err
    }
    
}

async function fetchRecordByEmail(email){
    try{
    const user = await UserDetail.findOne({email:email})
    return user;
    }
    catch(err)
    {
        return err
    }
}

module.exports= { insertRecord, fetchRecord ,updateRecord,fetchRecordByEmail} 