const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const deliversSchema = new Schema({
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
const Delivers = mongoose.model('Delivers', deliversSchema);

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
    return Delivers.create(info)
        .then(data => {
            console.log('The delivers information has been stored',data)
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
    return Delivers.updateOne({ _id: id }, dataUpdate)
        .then(data => {
            
            return data.n;
        })
        .catch(e => {
            console.log('ERROR: In delivers update: ')
            return e;
        })
}
module.exports = {
    Delivers,
    save,
    update
}