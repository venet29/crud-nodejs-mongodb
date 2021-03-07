'use strict'

var mongoose = require('mongoose');
const config = require("./config");
var app = require('./app');
var port = 3700

mongoose.Promise= global.Promise;
mongoose.connect('mongodb://'+ config.MONGODB_HOST+':27017/'+config.MONGODB_DATABASE)
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