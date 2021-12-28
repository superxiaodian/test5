const express = require("express")
const app = express()
const mongoose = require("mongoose")


//connect mongodb
dbURI = "mongodb://nodeapi:chenqing123%40%40@49.235.95.188:27017/nodeapi"

mongoose.connect(dbURI)
    .then(() => {
        console.log("数据库已连接")
        app.listen(3000)
    })
    .catch(error => console.log(error))


app.get("/", (req, res)=>{
    res.send("<p>hello</p>")
})