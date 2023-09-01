require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const Blog = require("./server/models/blog");

const app = express();
const PORT = 3000 || process.env.PORT; // listen to 3000 or whatever the port is

const dbUri = "mongodb+srv://hadjerbr:Cilekreceli1@cluster0.olfbzts.mongodb.net/bmb-blogs?retryWrites=true&w=majority"
mongoose.connect(dbUri).then((result) =>{
    app.listen(PORT);
}).catch((err) =>{
    console.log(err);
})

app.set("view engine", "ejs");
app.use(express.static("public"));
// app.use(express.urlencoded({extended: true}));



app.get("/", (req, res) => {
    Blog.find().sort({createdAt: -1}).then((result) => {
        res.render("index", {title: "Home", blogs: result});
    }).catch((err) => {
        console.log(err);
    })
})

app.get("/new", (re, res) => {
    const blog = new Blog({
        title: "blog1",
        body: "Hello, this is my first blog here! I wish you enjoy it. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis deserunt eligendi eius, dicta possimus vitae amet exercitationem nisi explicabo quas corporis excepturi iste asperiores? Eum pariatur temporibus quam vero! Eaque porro accusantium sapiente quo repellendus accusamus quas quaerat nobis non, placeat, ipsa laudantium quia reiciendis nostrum temporibus deserunt suscipit, amet maiores cumque cum! In, mollitia officiis molestiae facilis pariatur est laboriosam unde dignissimos suscipit. Ex, maiores commodi odit reiciendis enim nisi ut atque ipsa placeat dignissimos nobis officiis quidem qui repudiandae, error corrupti eius delectus expedita natus repellat, praesentium illum culpa. Iure maxime velit sunt numquam voluptates officia consequuntur et."
    })
    blog.save().then((result) => {
        res.redirect("/");
    }).catch((err) =>{
        console.log(err);
    });

})

app.get("/about", (req, res) => {
    res.render("index", {title: "About"});
})

app.get("/details/:id", (req, res) => {
    const id = req.params.id;
    Blog.findById(id).then(result => {
        res.render("details", {title: result.title, blog: result});
    }).catch(err => {
        console.log(err);
    })
})




