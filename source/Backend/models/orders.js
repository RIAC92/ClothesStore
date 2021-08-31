const { json } = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const followCode=require('../gen-order-id');

const orderSchema = new Schema({
    connection: {
        type: String,
        required: true,
        unique: true
    },
    follow_code:{
        type:String,
        required:true,
        unique:true
    },
    status:{
        type:String,
        required:true
    },
    status_history:[String],
    costumer_name:{
        type:String,
        required:true
    },
    costumer_last_name:{
        type:String,
        required:true
    },
    costumer_address:{
        type:String,
        required:true
    },
    costumer_phone:{
        type:String,
        required:true
    },
    costumer_email:{
        type:String,
        required:true
    },
    products:{
        type:[String],
        required:true
    },
    total:{
        type:Number,
        required:true
    },
    created_on: Date,
    updated_on: Date,
    edited_by: {
        type: mongoose.ObjectId,
        ref: 'Users'
    }
});

const Order = mongoose.model('Order', orderSchema);

const save = (data) => {
    let newOrder = {}
    let date=new Date();
    newOrder.connection=JSON.stringify(data.connection);
    newOrder.follow_code=followCode.base37(date.getTime());
    newOrder.status='new_order',
    newOrder.status_history=[JSON.stringify({
        status:'new_order',
        info:{created_on:date}
    })],
    newOrder.costumer_name=data.name,
    newOrder.costumer_last_name=data.last_name,
    newOrder.costumer_address=data.address
    newOrder.costumer_phone=data.phone,
    newOrder.costumer_email=data.email,
    newOrder.products=data.products,
    newOrder.total=data.total

    newOrder.created_on = new Date();
    newOrder.updated_on = new Date();
    return Order.create(newOrder)
        .then((data) => {
            console.log('>>>La orden creada: ',data)
            console.log('A new order has been created');
            return {
                follow_code: data.follow_code,
                connection:data.connection
            }
        })
        .catch(e => {
            console.log(e)
            return e
        })

}//end Order.create

const update = (data) => {
    let follow_code = data.follow_code;
    let dataUpdate = Object.assign({}, data.dataUpdate);
    dataUpdate.updated_on = new Date();
    return Order.updateOne({follow_code: follow_code}, dataUpdate)
        .then(data => {
            return data.n;
        })
        .catch(e => {
            console.log('ERROR: In orders update: ')
            return e;
        })
}
module.exports = {
    Order,
    save,
    update
}