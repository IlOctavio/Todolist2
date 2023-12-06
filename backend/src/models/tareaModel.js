// se implementa mongoose 
const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
    titulo: String,
    descripcion: String,
    fecha: String,
    completado: Boolean
    });

// se crea el modelo    
const Tarea = mongoose.model('Tarea', tareaSchema);

// se exporta el modelo
module.exports = Tarea;
