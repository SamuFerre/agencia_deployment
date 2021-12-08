import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

import dotenv from 'dotenv';
dotenv.config({path: 'variables.env'})

const app = express();

//conectar bd 
db.authenticate()
    .then( () => console.log('bd conectada'))
    .catch( error => console.log(error));

//Definir el puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

//Habilitar pug
app.set('view engine', 'pug');

// Obtener el año actual
app.use( (req, res, next ) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombresitio = "Agencia de Viajes";

    return next();
});

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

// definir la carpeta public
app.use(express.static('public'));


// Agregar Router
app.use('/', router);

app.listen(port, host, () => {
    console.log(`El Servidor esta funcionando`)
})
