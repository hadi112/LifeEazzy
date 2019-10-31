const express = require('express');
const router = express.Router();
const Product = require('../models/Products');
const csrf = require('csurf');
const csrfprotection=csrf();
var Cart = require('../models/cart');

router.get('/',function(req,res){
    Product.find(function(err,docs){
        res.send({products:docs})
    });
});

//button route
router.get('/add-to-cart/:id',function(req,res){
    var productid = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productid,function(err,product){
        if(err){
            return res.redirect('/');
        }
        cart.add(product,product.id);
        req.session.cart = cart;
        console.log(rq.session.cart);
        res.redirect('/')
    });
});


//for seeing the shopping cart view
router.get('/shopping-cart',function(req,res){
    if(!req.session.cart){
        return res.render('shop/shopping-cart',{products:null});
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart',{products:cart.generatearray(),totalprice:cart.totalprice});
});

//payment gateway using stripe!!
router.get('/checkout',function(req,res){
    if(!req.session.cart){
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/checkout',{total:cart.totalprice});
});

module.exports=router;