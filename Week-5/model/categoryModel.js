const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 50 },
    description: { type: String, default: "" },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;