const express = require('express');
const delivers = require('../../models/delivers.js');
const contacts = require('../../models/contacts.js');
const router = express.Router();


router.get('/', function (req, res) {
    delivers.Delivers.find({})
        .populate('contacts_id')
        .then(data => {
            res.json(data);
        })
        .catch(e => {
            console.log('ERROR in GET /admins/suppliers', e);
            res.json({ error: 'A error has occurred' });
        })
});

router.get('/:id', function (req, res) {
    let id = req.params.id
    console.log('GET id request: ', id)
    delivers.Delivers.find({ _id: id })
        .populate('contacts_id')
        .then(data => {
            if (data.length == 0) {
                res.json({ error: 'record do not exist' });
            } else {
                res.json(data[0]);
            }
        })
        .catch(e => {
            console.log('ERROR in GET /admins/suppliers', e);
            res.json({ error: 'A error has occurred' });
        })
});


router.post('/', function (req, res) {
    let body = req.body;
    body.edited_by=/*req.user.id||*/'60ccd610c1e2f835a0c2a752';//modificar:id para el desarrollo
    console.log('delivers body: ', body);
    delivers.save(body)
        .then((e) => {
            if(!e){
                res.json({ message: 'the deliver record has been saved' });
                return
            }else{
                console.log(e);
                res.json({ error: 'Probably the record already exist!' });
            }
            
        })
        .catch(e => {
            console.log(e);
            res.json({ error: 'A error has occurred' });
        })
});//end post

router.put('/', function (req, res) {
    let data = req.body;
    data.dataUpdate.edited_by=/*req.user.id||*/'60ccd610c1e2f835a0c2a752';//modificar:id para el desarrollo
    console.log('data delivers to update: ', data);

    delivers.update(data)
        .then(result => {
            if (result === 1) {
                res.json({ message: 'contact delivers info updated' })
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


});//end put


router.delete('/:id', function (req, res) {
    id = req.params.id;
    console.log('try to delete supplier id: ', id);
    contacts.Contacts.deleteMany({company_id:id})
    .then(()=>delivers.Delivers.deleteOne({_id:id}) )
    .then(result=>{
        if(result.n===1){
            res.json({message:'The deliver has been deleted'});
        }else{
            res.json({error:'the deliver record does not exist'});
        }
    })
    .catch(e=>{
        console.log(e);
        res.json({error:'An error has occurred'})
    });
    
});

module.exports = router;
