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
/*destino_id: {
        type: Number,
        required: true
    },*/
    valordelPaquete: {
        type: Number,
        required: true
    },
    destinos: [{ type:Schema.Types.ObjectId, ref: "destinos"}],

},
    {
        timestamps: true,
    }
);

module.exports = model('paquetesturisticos', paqueteturisticoSchema)

