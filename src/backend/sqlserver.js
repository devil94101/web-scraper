const mysql=require('mysql')
var connection=mysql.createConnection({
    host:'localhost',
    user:"root",
    password:"password",
    database:"scrape"
})
connection.connect(err=>{

    if(err)console.log(err)
    else console.log("database connected")
})
module.exports= connection