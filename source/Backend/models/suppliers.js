const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*
const contactSchema = new mongoose.Schema({
    name:String,
    charge:String,
    phone:String,
    email:String
});
*/
const suppliersSchema = new Schema({
    company: {
        type: String,
        required: true,
        unique: true
    },
    country: {
        type: String,
        required: true
    },
    contacts_id: [{
        type: mongoose.ObjectId,
        ref: 'Contacts'
    }],
    created_on: Date,
    updated_on: Date,
    edited_by: {
        type: mongoose.ObjectId,
        ref: 'Users'
    }
});
//"5e1a0651741b255ddda996c4" for test
const Suppliers = mongoose.model('Suppliers', suppliersSchema);

const save = (data) => {
    let info = {
        company: data.company,
        country: data.country,
        contacts_id: [],
        created_on: new Date(),
        updated_on: new Date(),
        edited_by: data.edited_by
    };
    console.log('This info will be save', info);
    return Suppliers.create(info)
        .then(data => {
            console.log('The Supplier information has been stored', data)
            return null;
        })
        .catch(e => {
            console.log('ERROR: In supplier create: ')
            return e;
        })
}

const update = (data) => {
    let id = data.company_id;
    let dataUpdate = Object.assign({}, data.dataUpdate);
    dataUpdate.updated_on = new Date();
    return Suppliers.updateOne({ _id: id }, dataUpdate)
        .then(data => {
            
            return data.n;
        })
        .catch(e => {
            console.log('ERROR: In supplier update: ')
            return e;
        })
}
module.exports = {
    Suppliers,
    save,
    update
}