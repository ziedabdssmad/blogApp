var express= require("express");
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var app=express();

mongoose.connect("mongodb://localhost/restful_blog_app");

// app config
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

//monggose/model config
var blogSchema = new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    created:{type:Date ,default:Date.now}
});
var Blog =mongoose.model("Blog",blogSchema)
/*
Blog.create({title:"testBlog",
image:"https://pixabay.com/get/e83db40e29f4063ed1584d05fb1d4e97e07ee3d21cac104496f3c47da0ecb6be_340.jpg",
body:"Hello this is the first blog"},function (err,blog) {
    if (err) {
        console.log(err);
    } 
})
*/
//Restful config

app.get("/",function (req,res) {
    res.redirect("index");
})

app.get("/blogs",function (req,res) {
    Blog.find({},function (err,blogs) {
        if (err) {
            console.log(err);
        } else {
            res.render("index",{blogs:blogs});
        }
    })
    
})

app.listen(3000,function () {
    console.log("blogApp is listening !");
})