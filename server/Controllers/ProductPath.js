
const Product = require('../models/Product');
const getAllProducts = async (req, res) => {
    try {
        const Products = await Product.find();
        if (Products.length == 0) {
            res.status(200).send({ status: 200, data: Products, Message: 'No Products are available' });
        }
        else {
            res.status(200).send({ status: 200, data: Products, Message: 'Product Fetched' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ status: 400, success: false, Message: 'Something went wrong' });
    }
};

const creatProduct = async (req, res) => {
    try {

        const { Name, Price, Category, ImageURL } = req.body;
        console.log(Name, Price, ImageURL);
        let isExiting = await Product.findOne({ Name: Name });
        if (isExiting) {
            return res.status(400).send({ Status: 400, data: [], Message: "This Product is already Exist" });
        }
        const newProduct = new Product({
            Name, Price, Category, ImageURL
        });
        const newProductData = await newProduct.save();
        console.log(newProduct);
        res.status(200).send({ status: 200, success: true, Message: 'Successfully registered' });
    } catch (error) {
        console.log(error);
        res.status(400).send({ status: 400, success: false, Message: 'Something went wrong' });
    }
}

module.exports = { getAllProducts, creatProduct }
