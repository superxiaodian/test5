const express = require("express")
const mongoose = require("mongoose")
const Blog = require("./models/blog")
const morgan = require("morgan")

const app = express()
app.set("view engine", "ejs")

app.use(morgan("tiny"))
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))//接收表单数据
app.use(express.json())//接收json数据
//connect mongodb
dbURI = "mongodb://nodeapi:chenqing123%40%40@49.235.95.188:27017/nodeapi"

mongoose.connect(dbURI)
    .then(() => {
        app.listen(3000)
        console.log("database connected")
    })
    .catch(error => console.log(error))


app.get("/", (req, res) => {
    res.redirect("/blogs")
})

app.get("/blogs", (req, res) => {
    Blog.find().sort({ createdAt: 1 }).then(blogs => res.render("index", { title: "所有博客", blogs })).catch(error => {
        console.log(error)
    })
})

app.post("/blogs", (req, res) => {
    const blog = new Blog(req.body)

    blog.save().then(result=>{
        res.redirect("/blogs")
    })
})

app.get("/about", (req, res) => {
    res.render("about", { title: "关于我们" })
})

app.get("/about-us", (req, res) => {
    res.redirect("/about")
})

app.get("/blog/create", (req, res) => {
    res.render("create", { title: "创建博客" })
})





app.use((req, res) => {
    res.status(404).render("404", { title: "404" })
})