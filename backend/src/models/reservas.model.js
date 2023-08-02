const { Schema, model } = require('mongoose');

const reservaSchema = new Schema({
    fechaReserva: {
        type: String,
        
    },
    /*cliente_id: {
       type: Number,
        required: true,
    },*/
    paqueteTuristico_id: {
        type: Number,
        
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

    clientes: [{ type:Schema.Types.ObjectId, ref: "clientes"}],
    paquetesturisticos: [{ type:Schema.Types.ObjectId, ref: "paquetesturisticos"}]
},
    {
        timestamps: true,
    }
);

module.exports = model('reservas', reservaSchema)