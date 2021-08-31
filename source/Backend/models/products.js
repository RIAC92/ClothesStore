const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*
import { Schema as _Schema, ObjectId, model } from 'mongoose';
const Schema = _Schema;
*/
const productsSchema = new Schema({
    buy_code: {
        type: String,
        required: true,
        unique: true
    },
    supplier_product_code: String,
    supplier_id: {
        type: mongoose.ObjectId,
        ref: 'Suppliers',
        require: true
    },
    name: {
        type: String,
        require: true,
        unique: true
    },
    description:String,
    mark: String,
    size: [String],
    stock: {
        type: Number,
        min: 0
    },
    views: [String],
    units_sold: [String],
    images: [String],
    tags: [String],
    price: {
        type: Number,
        min: 0,
        required: true
    },
    discount: {
        type: Number,
        min: 0,
        max: 1,
    },
    created_on: Date,
    updated_on: Date,
    edited_by: {
        type: mongoose.ObjectId,
        ref: 'Users'
    }
});

const Products = mongoose.model('Products', productsSchema);

const save = (data) => {
    let newProduct = Object.assign({}, data)
    newProduct.views = [];
    newProduct.units_sold = [];
    newProduct.created_on = new Date();
    newProduct.updated_on = new Date();
    console.log('new product',newProduct);

    return Products.create(newProduct)
        .then(() => {
            console.log('A new product has been created');
            return null
        })
        .catch(e => {
            console.log(e)
            return e
        })

}
const update = (data) => {
    let buy_code = data.buy_code;
    let dataUpdate = Object.assign({}, data.dataUpdate);
    dataUpdate.updated_on = new Date();
    return Products.updateOne({buy_code: buy_code }, dataUpdate)
        .then(data => {

            return data.n;
        })
        .catch(e => {
            console.log('ERROR: In product update: ')
            return e;
        })
}
module.exports = {
    Products,
    save,
    update
}