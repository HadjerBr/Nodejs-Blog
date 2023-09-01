// const { default: mongoose } = require("mongoose");
const mongoose = require("mongoose");

const schema = mongoose.Schema;

const blogSchema = new schema({
    title: {
        type: String,
        required: true

    },
    body: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
}, {timestamps: true});

const blog = mongoose.model("blog", blogSchema);
module.exports = blog;