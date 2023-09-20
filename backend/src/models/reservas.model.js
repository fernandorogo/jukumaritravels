const { Schema, model } = require('mongoose');

const reservaSchema = new Schema({
    fechaReserva: {
        type: Date,
        
    },
   
    fechaSalida: {
        type: Date,
       
    },
    fechaLlegada: {
        type: Date,
        
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