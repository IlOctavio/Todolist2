// Se importan express, mongoose, cors
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Se importa el router
const routes = require('./src/routers/index');

//Se nstancia express
const app = express();    

//Se inicializa cors
app.use(cors());

// Se define el puerto
const port = 3000;

//Se configura la db de mongoose con las opciones para que no de error ni advertencias
mongoose.connect('mongodb://127.0.0.1:27017/todo');

// Se define los middlewares
// para que express pueda leer json
app.use(express.json());
// para cambiar la ruta antes del endpoint y despues del host (para las ramas)
app.use('/upso', routes);

//Se inicializa el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});

