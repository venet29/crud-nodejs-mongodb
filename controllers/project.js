
var Project = require('../models/project')
var fs = require('fs');
var path=require('path');





var controller = {
    home:function(req,res){
        return res.status(200).send({
            messege:'SOY la home'
        });

    },
    test: function(req,res){
        return res.status(200).send({
            messege:'SOY metodo o acciono test del controlador de project'
        });
    },
    saveProject: function (req,res)
    {
        var project = new Project();
        var params= req.body;    
        project.name= params.name;
        project.description=params.description;
        project.category=params.category;
        project.year=params.year;
        project.langs=params.langs;
        project.image=null;

        //guardar en la base de datos
        project.save((err,projectStored)=> {
            
            if(err) return res.status(500).send({messege:'error al guardar'});

            if(!projectStored) return res.status(404).send({messege:'no se ha podido guardar el proyecto'});
            
            return  res.status(200).send({project : projectStored});
        });

    

    },
    getProject: function (req,res)
    {
        var projectId = req.params.id;
        if (projectId==null) return res.status(404).send({messege:'proyecto no existe'})

    Project.findById(projectId,(err, project)=> {
            if(err) return res.status(500).send({messege:'error al devolver datos'});
            if(!project) return res.status(404).send({messege:'proyecto no existe'});

            return res.status(200).send({project});
       })
   
        //guardar en la base de datos
     

    },
    getProjects: function (req,res)
    {
        //Project.find({year:2019})  --similar where
        //ordenar de meno mayor a menor , sin el menos es alrevez
        Project.find({}).sort('-year').exec((err,projects)=>{

            if(err) return res.status(500).send({messege:'error al devolver datos'});
            if(!projects) return res.status(404).send({messege:'no hay proyectos para mostrar'});
            return res.status(200).send({projects});
        });       
        //guardar en la base de datos    
    },
    updateProject: function (req,res)
    {
        var projectId = req.params.id;
        var update = req.body;
        if (projectId==null) return res.status(404).send({messege:'proyecto no existe'})

        //{new :true} es para devolver el nuevo caso, sino esta devuelve el antiguo
       var prj=  Project.findByIdAndUpdate(projectId,update,{new :true},(err, projectUpdate)=> {
            if(err) return res.status(500).send({messege:'error al actualizar datos'});
            if(!projectUpdate) return res.status(404).send({messege:'proyecto no existe'});

            return res.status(200).send({project: projectUpdate});
       })
   
        //guardar en la base de datos
     

    },
    deleteProject: function (req,res)
    {
        var projectId = req.params.id;

        if (projectId==null) return res.status(404).send({messege:'proyecto no existe'})

        //{new :true} es para devolver el nuevo caso, sino esta devuelve el antiguo
       var prj=  Project.findByIdAndRemove(projectId,(err, projectDelete)=> {
            if(err) return res.status(500).send({messege:'error al borrar datos'});
            if(!projectDelete) return res.status(404).send({messege:'proyecto no existe'});

            
            return res.status(200).send({project: projectDelete});
       })
   
        //guardar en la base de datos
     

    }  ,
    uploadImg: function (req,res)
    {
        var projectId = req.params.id;
        var fileName ="imagen no subida..";

        if (req.files){
            console.log(req.files);
           var filepath = req.files.image.path; 
           console.log(filepath);
           console.log(filepath.split("\\")); 
           const filepathSplit = filepath.split("\\");  
           console.log(filepathSplit);
            var filename= filepathSplit[1];
            var extspli=filename.split("\.");
            var fileExt=extspli[1];
            if (fileExt=='png' || fileExt=='jpg' || fileExt=='jpge' || fileExt=='gif' )    
            {
            Project.findByIdAndUpdate(projectId,{image:filename},{new :true},(err, projectUpdate)=> {
                            if(err) return res.status(500).send({messege:'error la imagen no ha subido'});
                            if(!projectUpdate) return res.status(404).send({messege:'proyecto no existe'});
                
                            return res.status(200).send({project: projectUpdate});
                    });

            }else
            {
                fs.unlink(filepath,(err)=>{
                    return res.status(200).send({message: 'la extension no es valida'});
                    
                });
            }

          

        }else
        {
            return res.status(200).send({files: filename});
        }
 
    },
    getImageFile: function(req,res){
        var file= req.params.image;
        var path_file = './uploads/'+file;
        fs.access(path_file,fs.constants.F_OK,(err)=>{
            if(err){
                return res.status(200).send({  messege:'no exoste la ruta'})
                
            }else{
                return res.sendfile(path.resolve(path_file));
            }
        })

    }    


};

module.exports = controller;