const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require('./database');

const app = express();
//configurando o asigna un puerto para nuestro servidor
app.set("Port", 4000);
//el morgan nos sirve para saber que tipo de dato de peticiones esta recibiendo nuestro servidor
app.use(morgan("dev"));
//express json, nos sirve para convertir los datos en objetos json y leerlos 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//cors nos sirve para permitir conexiones desde cualquier cliente
app.use(cors({ origin: "*" }));

//rutas o vistas

app.use('/api/clientes', require('./routes/clientes.route'));
app.use('/api/reservas', require('./routes/reservas.route'));
app.use('/api/pasajeros', require('./routes/pasajerosdelareserva.route'));
app.use('/api/paquetes', require('./routes/paquetesturiticos.route'));
app.use('/api/detallepaquete', require('./routes/detallepaquete.route'));
app.use('/api/productos', require('./routes/productosturisticos.route'));
app.use('/api/destinos', require('./routes/destinos.route'));
app.use('/api/categorias', require('./routes/categoriadestino.route'))
app.use('/api/proveedores', require('./routes/proveedores.route'));
app.use('/api/paises', require('./routes/pais.route'));
app.use('/api/estados', require('./routes/estado.route'));
app.use('/api/ciudades', require('./routes/ciudad.route'));


//Inicando nuestro servidor
app.listen(app.get("Port"), () => {
    console.log("Servidor corriendo por el puerto",
        app.get("Port"));
});

