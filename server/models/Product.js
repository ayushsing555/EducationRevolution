    const mongoose = require("mongoose");
    const productSchema = new mongoose.Schema({
        Name: String,
        ImageURL:String,
        Price:Number,
        Category:String
    }
    );
    const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
    module.exports = Product;
