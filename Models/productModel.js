const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    ProductName:{
        type: String,
        required: true,
        trim: true
    },
    ProductDescription:{
        type: String,
        required: true,
    },
    ProductPrice:{
        type: Number,
        required: true,
    },
    ProductImage:{
        type: String,
        required: true,
    },
    ProductCategory:{
        type: String,
        required: true,
        enum : ["Electronics", "FoodStuffs", "Fashion", "Fragrance"]
    },
    
}, {timestamps : true});

const productModel = mongoose.model("product", ProductSchema);

module.exports = productModel;