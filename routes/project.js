// fichero de configuracion de todas las rutas
'use strict'

var express= require('express');
var ProjectController = require('../controllers/project');

var router= express.Router();


//midellware

var  multipar=require('connect-multiparty');
var multiparMiddleware= multipar({uploadDir: './uploads'});

router.get('/home',ProjectController.home);
router.post('/test',ProjectController.test);
router.post('/save-project',ProjectController.saveProject);
router.get('/project/:id?',ProjectController.getProject);
router.get('/projects',ProjectController.getProjects);
router.put('/project/:id?',ProjectController.updateProject );
router.delete('/project/:id?',ProjectController.deleteProject );
router.post('/upload-image/:id?',multiparMiddleware,ProjectController.uploadImg );
router.get('/get-image/:image',ProjectController.getImageFile);

module.exports=router;