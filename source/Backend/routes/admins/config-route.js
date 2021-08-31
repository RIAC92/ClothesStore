const express = require('express');
const fatsConfig = require('../../fast-access-var/fast-access-var.js');
const router = express.Router();

router.get('/whoiam', function (req, res) {
    if(req.user){
        res.json({username:req.user.username})
    }else{
        res.json({username:'unkown'})
        
    }

});
router.get('/', function (req, res) {
    let dataToSend = {
        tags: null,
        banner: null
    }

    fatsConfig.read('tags')
        .then(tags => {
            dataToSend.tags = tags;
            return fatsConfig.read('banner')
        })
        .then(banner => {
            dataToSend.banner = banner;
            res.json(dataToSend);
            return
        })
        .catch(e => {
            console.log(e);
            res.json({ error: 'A error has occured' });
        })


});


router.get('/:fileName', function (req, res) {
    let filename = req.params.fileName;
    if (!filename) {
        res.json({ error: 'specify a file' });
        return
    }
    fatsConfig.read(filename)
        .then(data => {
            console.log('send data:', data);
            res.json(data);
            return
        })
        .catch(e => {
            console.log(e);
            res.json({ error: 'A error has occured' });
        })


});

router.put('/', function (req, res) {
    let filename = req.body.fileName;
    let dataUpdate = req.body.dataUpdate;
    console.log('this has been recived: ', filename, dataUpdate)
    if (!filename) {
        res.json({ error: 'specify a file' });
        return
    }
     fatsConfig.write(dataUpdate, filename)
        .then(() => res.json({ message: 'The info has been updated' }))
        .catch(e => {
            console.log(e);
            res.json({ error: 'An error has occured' });
        })


});



module.exports = router;