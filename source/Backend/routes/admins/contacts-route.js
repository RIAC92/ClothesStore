const express = require('express');
const contacts = require('../../models/contacts.js');
const router = express.Router();

router.post('/', function (req, res) {
    let data = req.body;
    data.edited_by=/*req.user.id||*/'60ccd610c1e2f835a0c2a752';//modificar:id para el desarrolloreq.user.id
    console.log('info recived: ', data);

    contacts.save(data)
        .then(result => {
            if (result._id) {
                res.json({
                    message: 'contact info recived',
                    contact_id: result._id
                })
            } else {
                res.json({ error: 'The contact could not be added' })
                console.log("Error:", result);
            }//end else
        })
        .catch(e => console.log(e))


});

router.delete('/:id', (req, res) => {
    id = req.params.id;
    console.log('try to delete constact id:', id)
    contacts.Contacts.deleteOne({ _id: id })
        .then((deleteData) => {
            if (deleteData.n == 0) {
                res.json({ error: `the contact not exist` })
                return console.log(`the contact not exist`)
            } else {
                res.json({ message: `the contact id:${id}, has been deleted` })
                return console.log(`the contact id:${id}, has been deleted`)
            }
        })
        .catch(e => {
            res.json({ error: 'the contact can not be deleted' });
            console.log(e);
            return
        })
})

router.put('/', function (req, res) {
    let data = req.body;
    data.dataUpdate.edited_by=/*req.user.id||*/'60ccd610c1e2f835a0c2a752';//modificar:id para el desarrolloreq.user.id
    console.log('data contact to update: ', data);

    contacts.update(data)
        .then(result => {
            if (result === 1) {
                res.json({ message: 'contact info updated' })
            } else {
                res.json({ error: 'The contact could not be added' })
                console.log("Error:", result);
            }//end else
        })
        .catch(e => console.log(e))


});


module.exports = router;