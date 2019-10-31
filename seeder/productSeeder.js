const Product = require('../models/Products');
const mongoose = require('mongoose');
const config = require('../config/database');

mongoose.connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
        .then(()=>{
            console.log('database connected successfully '+ config.database);
        })
        .catch(err=>{
            console.log(err);
        });


const products = [
    new Product({
        imagepath:'/home/hadi/Desktop/LifeEazzy/bag.jpeg',
        title:'Bags',
        description:'Awesome Bags',
        price:10
    }),

    new Product({
        imagepath:'/home/hadi/Desktop/LifeEazzy/naruto.jpeg',
        title:'naruto',
        description:'Awesome anime',
        price:100
    }),

    new Product({
        imagepath:'/home/hadi/Desktop/LifeEazzy/playstation.jpeg',
        title:'video game console',
        description:'20 preloaded games',
        price:200
    })
];

var done=0;
for(var i=0;i<products.length;i++)
{
    products[i].save(function(err,result){
        done++;
        if(done === products.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}