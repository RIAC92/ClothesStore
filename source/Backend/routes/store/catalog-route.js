const express = require('express');
const products = require('../../models/products');
const fatsConfig = require('../../fast-access-var/fast-access-var');

const router = express.Router();

const AllowProductDescription = ['size', 'images', 'tags', 'buy_code', 'name', 'description', 'mark', 'stock','price'];

router.get('/', function (req, res) {
    products.Products.find({})
        .then(data => {
            let dataToSend = productFilter(data);
            res.json(dataToSend);
            return
        })
        .catch(e => {
            console.log(e)
            res.json({ error: 'Ha ocurrido un error' })
        })
});

router.get('/tags', function (req, res) {
    let filename = 'tags';

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

router.get('/search', function (req, res) {

    let tagsQuery = Object.assign({}, req.query);
    console.log('estas son las estiquetas: ', tagsQuery)
    //res.json({message:'info recivida'})

    if (tagsQuery.all === "false") {
        let keysTags = Object.keys(tagsQuery);
        let keysTagsfilter = keysTags.filter(tag => tag !== 'all');
        let tags = keysTagsfilter.map(tag => tagsQuery[tag]);
        console.log('Estos son las viñetas: ', tags)
        products.Products.find({ tags: { $all: [...tags] } })
            .then(data => {
                let dataToSend = productFilter(data);
                res.json(dataToSend);
                return null
            })
            .catch(e => {
                console.log(e);
                res.json({ error: 'An error has occurred' })
                return
            })
    } else {
        products.Products.find({})
            .then(data => {
                let dataToSend = productFilter(data);
                res.json(dataToSend);
                return
            })
            .catch(e => {
                console.log(e);
                res.json({ error: 'An error has occurred' })
            })
    }




});

function productFilter(product) {
    return product.map(item => {
        let keys = AllowProductDescription;
        let objectReturn = {};
        for (let i = 0; i < keys.length; i++) {
            objectReturn[keys[i]] = item[keys[i]];
        }//end for
        return objectReturn
    })//product.map

}

module.exports = router;