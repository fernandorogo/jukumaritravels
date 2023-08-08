const { Schema, model } = require('mongoose');

const paqueteturisticoSchema = new Schema({
    paqueteTuristico: {
        type: String,
        required: true,
    },
    reseñaPaqueteturistico: {
        type: String,
        required: true,
    },
    valordelPaquete: {
        type: Number,
        required: true
    },
    destinos: [{ type:Schema.Types.ObjectId, ref: "destinos"}],
    detallepaquete: [{ type:Schema.Types.ObjectId, ref: "detallepaquete"}]

},
    {
        timestamps: true,
    }
);

module.exports = model('paquetesturisticos', paqueteturisticoSchema)

