const express=require('express')
var app=express()
const cors=require('cors')
const router=require('./router/router')
const mysqlServer=require('./sqlserver')
app.use(cors())
app.use(express.json())
app.use('/',router)
app.listen(5000,()=>{
    console.log("listening")
});