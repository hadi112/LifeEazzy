const express = require('express');
const router = express.Router();

router.get('/ac-service',(req,res)=>{
    res.send({msg:'ac service'});
});

router.get('/ro-service',(req,res)=>{
    res.send({msg:'ro service'});
});

router.get('/electricians',(req,res)=>{
    res.send({msg:'electrician service'});
});

router.get('/fridge-service',(req,res)=>{
    res.send({msg:'fridge service'});
});

module.exports=router;