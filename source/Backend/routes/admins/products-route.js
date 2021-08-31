const express = require('express');
const products = require('../../models/products.js');
const router = express.Router();
router.get('/', (req, res) => {
    products.Products.find({})
        .then(data => res.json(data))
        .catch(e => {
            console.log(e);
            res.json({ error: 'An error has occurred' })
        })
});

router.get('/:buy_code', (req, res) => {
    let buy_code = req.params.buy_code;
    products.Products.find({ buy_code: buy_code })
        .then(data => res.json(data[0]))
        .catch(e => {
            console.log(e);
            res.json({ error: 'An error has occurred' })
        })
});


router.post('/', function (req, res) {
    let data = Object.assign({}, req.body.dataUpdate);
    delete data['_id']
    data.edited_by = /*req.user.id||*/'60ccd610c1e2f835a0c2a752';//modificar:id para el desarrollo

    products.save(data)
        .then((data) => {
            if (!data) {
                res.json({ message: 'A new product has been created' })
                return
            }else{
                res.json({error:'An error has occurred, maybe by a duplicated key'})
            }

        })
        .catch(e => {
            console.log(e)
            res.json({ error: 'An error has occurred' })
            return
        })


});

router.put('/',(req,res)=>{
    let data=req.body;
    data.dataUpdate.edited_by=/*req.user.id||*/'60ccd610c1e2f835a0c2a752';//modificar:id para el desarrollo
    products.update(data)
    .then(result=>{
        if(result==1){
            res.json({message:'The product has been updated'});
            return
        }else{
            res.json({error:'Product record has not been updated'});
            return
        }
    }).
    catch(e=>{
        console.log(e);
        res.json({error:'An error has been occurred'});
        return
    })
})
router.delete('/:buy_code',(req,res)=>{
    let buy_code=req.params.buy_code;
    
    products.Products.deleteOne({buy_code:buy_code})
    .then(result=>{
        if(result.n===1){
            res.json({message:'The product has been deleted'});
            return
        }else{
            res.json({error:'The product do not exist'});
        }
    })
    .catch(e=>{
        console.log(e);
        res.jon({error:'An error has occurred'})
    });
});


module.exports = router;