var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name: { type: String, required: true, max: 150 },
    description: { type: String, required: true },
    category:{ type: String},
    year:{ type: Number},
    langs:{ type: String},
    image:{type:  String }


});
module.exports = mongoose.model('Project', ProjectSchema);
// aunque guarde como 'Project' mongoose cambia el nombre a 'projects', como es el nombre de la colleccion