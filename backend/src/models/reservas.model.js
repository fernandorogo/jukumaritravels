const { Schema, model } = require('mongoose');

const reservaSchema = new Schema({
    fechaReserva: {
        type: String,
        
    },
   
    fechaSalida: {
        type: String,
       
    },
    fechaLlegada: {
        type: String,
        
    },
    pasajeros: {
        type: String,
        
    },
    clientes: [{ type: Schema.Types.ObjectId, ref: "clientes" }],

    paquetesturisticos: [{ type: Schema.Types.ObjectId, ref: "paquetesturisticos" }]
},
    {
        timestamps: true,
    }
);

module.exports = model('reservas', reservaSchema)