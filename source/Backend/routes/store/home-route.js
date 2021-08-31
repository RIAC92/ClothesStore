const express = require('express');
const fatsConfig = require('../../fast-access-var/fast-access-var.js');
const router = express.Router();

router.get('/', function (req, res) {
    let filename = 'banner'
    
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



module.exports = router;