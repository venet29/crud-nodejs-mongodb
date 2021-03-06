'use strict'
const express = require('express');
const body_parse = require('body-parser');
const app = express();

//cargar archivos de rutas

var project_router= require('./routes/project');

//middlewares
app.use(body_parse.urlencoded({ extended: false }))
app.use(body_parse.json())// que todo lo que llegue(cualquier tipo de peticion) pase ajson


//configuracion cabecerasd y cors 

// Configurar cabeceras y cors

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
//rutas

app.use('/api',project_router);


//export
module.exports = app;