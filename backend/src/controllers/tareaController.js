// Se importa el modelo de la tarea
const Tarea = require('../models/tareaModel');

//Se importa mongoose
const mongoose = require('mongoose');

// Se crean las funciones que del controlador

// Se crea la función que obtiene todas las tareas
const getTareas = async (req, res) => {
    try {//casos de exitos
        // Se obtienen todas las tareas
        const tareas = await Tarea.find();
        // Se envían las tareas y despues el status
        res.json(tareas).status(200);
    } catch (error) {//caso de que no se cumple
        // Se envía el error y el status
        res.json({message: "Error al obtener las tareas"}).status(500);
    }
}
// Se crea la función que crear una tarea
const postTarea = async (req, res) => {
    try {//casos de exitos
        // Se crea la tarea con los datos del body
        const nuevaTarea = new Tarea(req.body);
        // Se guarda la tarea
        const guardarTarea = await nuevaTarea.save(); 
        
        // Se arma la respuesta y despues el status
        res.json(guardarTarea).status(201);

    } catch (error) {//caso de que no se cumple
        // Se envía el error
        res.json({message: "Error al crear la tarea" }).status(500);
    }
}
// Se crea la función que actualizar una tarea
const updateTarea = async (req, res) => {
    try {//casos de exitos
        // Se actualiza la tarea buscando por id y enviando los datos del body, con la opción new: true para que devuelva el resultado de la actualizacion
        console.log(req.body)
        const actualizarTarea = await Tarea.findByIdAndUpdate(req.params.id, req.body, {new: true});
        
        // Se envía la tarea actualizada y despues el status
        res.json(actualizarTarea).status(200);
    } catch (error) {//caso de que no se cumple
        // Se envía el error y el status
        res.json({message: "Error al actualizar la tarea"}).status(500);
    }
}

// Se crea la función que elimina una tarea
const deleteTarea = async (req, res) => {
    try {//casos de exitos
        // Se elimina la tarea buscando por id
        await Tarea.findByIdAndDelete(req.params.id);
        // Se envía la respuesta de la eliminacion y despues el status 
        res.json({message: "Tarea eliminada correctamente"}).status(200);
    } catch (error) {//caso de que no se cumple
        // Se envía el error y el status
        res.json({message: "Error al eliminar la tarea"}).status(500);
    }
}
// Se exportan las funciones
module.exports = {
    getTareas,
    postTarea,
    updateTarea,
    deleteTarea
}
