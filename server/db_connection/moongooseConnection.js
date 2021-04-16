const mongoose= require('mongoose')
const dotenv = require('dotenv')
dotenv.config();


mongoose.connect('mongodb://localhost:27017/orboProject',{ useNewUrlParser: true,useUnifiedTopology: true  } )
.catch(err => console.log(err) )
const connection = mongoose.connection


const userDetailSchema = new mongoose.Schema(
    {
        firstname:{ type:String, required:true },
        lastname:{type:String,required:true },
        phone:{ type:Number, required:true },
        email:{type:String, required:true},
        password:{ type:String },
        salt:{type:String, required:true},
        status:{type:String,default:'pending'}
    }
)

const Model = new mongoose.model('UserDetail' , userDetailSchema)

module.exports=connection