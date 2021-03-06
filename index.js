'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700

mongoose.Promise= global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio')
        .then(
            ()=> {
                console.log('conenccion a base de datos establecida');
                app.listen(port,()=>{
                    console.log("servidor corriedno correctamente");
                })
            }

        )
        .catch(
            err=>console.log(err)
        );