const { Schema, model } = require('mongoose');

const pasajerosdelareservaSchema = new Schema({

    clientes: [{ type: Schema.Types.ObjectId, ref: "clientes" }],

    reservas: [{ type: Schema.Types.ObjectId, ref: "reservas" }],

},
    {
        timestamps: true,
    }
);

module.exports = model('pajaserosdelareserva', pasajerosdelareservaSchema)