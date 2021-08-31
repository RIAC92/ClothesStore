const express = require('express');
const suppliers = require('../../models/suppliers.js');
const contacts = require('../../models/contacts.js');
const router = express.Router();

router.get('/', (req, res) => {
    suppliers.Suppliers.find({})
        .populate('contacts_id')
        .then(data => {
            res.json(data);
        })
        .catch(e => {
            console.log('ERROR in GET /admins/suppliers', e);
            res.send('A problem has occurred');
        })
})

router.get('/:id', (req, res) => {
    let id = req.params.id;
    console.log('GET supplier',id)
    suppliers.Suppliers.find({ _id: id })
        .populate('contacts_id')
        .then(data => {
            if(data.length==0){
                res.json({error:'record do nor exist'});
            }else{
            console.log('data:', data)
            res.json(data[0]);
            }
        })
        .catch(e => {
            console.log('ERROR in GET /admins/supplier/:id', e);
            res.send('A problem has occurred');
        })

})

router.post('/', function (req, res) {
    
    let data = req.body;
    data.edited_by=/*req.user.id||*/'60ccd610c1e2f835a0c2a752';//modificar:id para el desarrollo
    suppliers.save(data)
        .then(result => {
            if (result === null) {
                res.json({message:'The supplier info has been stored'})
            } else {
                res.json({error:'Provider information has not been saved'})
                console.log("Error:", result);
            }//end else
        })
        .catch(e => console.log(e))


});

router.put('/', function (req, res) {
    let data = req.body;
    data.dataUpdate.edited_by=/*req.user.id||*/'60ccd610c1e2f835a0c2a752';//modificar:id para el desarrollo
    console.log('data supplier to update: ', data);

    suppliers.update(data)
        .then(result => {
            if (result ===1) {
                res.json({ message: 'contact supplier info updated' })
            } else {
                res.json({ error: 'The contact could not be added' })
                console.log("Error:", result);
            }//end else
        })
        .catch(e => {
            console.log(e)
            res.json({ error: 'The contact could not be added' });
            return
        })


});

router.delete('/:id', function (req, res) {
    id = req.params.id;
    console.log('try to delete supplier id: ', id);
    contacts.Contacts.deleteMany({company_id:id})
    .then(()=>suppliers.Suppliers.deleteOne({_id:id}) )
    .then(result=>{
        if(result.n===1){
            res.json({message:'The supplier has been deleted'});
        }else{
            res.json({error:'The supplier record does not exist'});
        }
    })
    .catch(e=>{
        console.log(e);
        res.json({error:'An error has occurred'})
    });
    
});

module.exports = router;