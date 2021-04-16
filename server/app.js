const express =require('express')
const router = require('./router/router');
const path = require('path')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'../client')))
app.use(router);





app.listen(5000,()=>console.log('Connected'));