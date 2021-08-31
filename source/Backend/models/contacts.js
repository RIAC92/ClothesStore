
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactsSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    company_id: {
        type: mongoose.ObjectId,
        ref: 'Suppliers',
        require: true
    },
    charge: String,
    phone: String,
    email: String,
    created_on: Date,
    updated_on: Date,
    edited_by: mongoose.ObjectId
});

const Contacts = mongoose.model('Contacts', contactsSchema);

const save = (data) => {
    let info = {
        name: data.name,
        company_id: data.company_id,
        charge: data.charge,
        phone: data.phone,
        email: data.email,
        created_on: new Date(),
        updated_on: new Date(),
        edited_by: data.edited_by
    };
    console.log('This info will be save', info);
    return Contacts.create(info)
        .then(data => {
            console.log('The Contacts information has been stored', data)
            return data;
        })
        .catch(e => {
            console.log('ERROR: In contacts create: ')
            return e;
        })
}//end save

const update = (data) => {
    let id = data.contact_id;
    let dataUpdate = Object.assign({}, data.dataUpdate);
    dataUpdate.updated_on = new Date();
    return Contacts.updateOne({ _id: id }, dataUpdate)
        .then(data=> {
            return data.n;
        })
        .catch(e => {
            console.log('ERROR: In supplier update: ')
            return e;
        })
}
module.exports = {
    Contacts,
    save,
    update
}