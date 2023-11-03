const { Schema, model } = require('mongoose');

const reservaSchema = new Schema({
    fechaReserva: {
        type: String, // Cambiado a Date para trabajar con fechas
        required: true
    },
   
    fechaSalida: {
        type: Date
    },

    fechaLlegada: {
        type: Date
    },

    npasajeros: {
        type: Number
    },

    clientes: [{type: Schema.Types.ObjectId, ref: 'clientes' }],
    destinos: [{ type: Schema.Types.ObjectId, ref: 'destinos' }],
    paquetesturisticos: [{ type: Schema.Types.ObjectId, ref: "paquetesturisticos" }]
},
    {
        timestamps: true,
    }
);

module.exports = model('reservas', reservaSchema)