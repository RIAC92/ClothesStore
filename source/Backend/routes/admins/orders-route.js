const express = require('express');
const orders= require('../../models/orders.js');
const router = express.Router();

router.get('/', (req, res) => {
    orders.Order.find({})
        .then(data => res.json(data))
        .catch(e => {
            console.log(e);
            res.json({ error: 'An error has occurred' })
        })
});

router.get('/search', (req, res) => {
    let query=Object.assign({},req.query);


    orders.Order.find(query)
        .then(data => res.json(data))
        .catch(e => {
            console.log(e);
            res.json({ error: 'An error has occurred' })
        })
});



router.put('/',(req,res)=>{
    let data=req.body;
    orders.update(data)
    .then(result=>{
        if(result==1){
            res.json({message:'The order has been updated'});
            return
        }else{
            res.json({error:'Order record has not been updated'});
            return
        }
    }).
    catch(e=>{
        console.log(e);
        res.json({error:'An error has been occurred'});
        return
    })
})

router.delete('/:follow_code',(req,res)=>{
    let follow_code=req.params.follow_code;
    
    orders.Order.deleteOne({follow_code})
    .then(result=>{
        if(result.n===1){
            res.json({message:'The order has been deleted'});
            return
        }else{
            res.json({error:'The order do not exist'});
        }
    })
    .catch(e=>{
        console.log(e);
        res.jon({error:'An error has occurred'})
    });
});


module.exports = router;