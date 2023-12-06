//DEFINICION DE RUTAS
// Se importa express
const express = require('express');

// se importa el controlador de tarea
const tareaController = require('../controllers/tareaController');

// Se instancia el router de express para seguir el patron MVC
const router = express.Router();

// Se definen las rutas
router.get('/tareas', tareaController.getTareas);
router.post('/tareas', tareaController.postTarea);
router.put('/tareas/:id', tareaController.updateTarea);
router.delete('/tareas/:id', tareaController.deleteTarea);

// se exporta el router
module.exports = router;

