const { Schema, model } = require('mongoose');

const pasajerosdelareservaSchema = new Schema({
    /*reserva_id: {
        type: Number,
        required: true,
    },
    cliente_id: {
        type: Number,
        required: true,
    },*/
    clientes: [{ type:Schema.Types.ObjectId, ref: "clientes"}],
    reservas: [{ type:Schema.Types.ObjectId, ref: "reservas"}],

},
    {
        timestamps: true,
    }
);

module.exports = model('pajaserosdelareserva', pasajerosdelareservaSchema)