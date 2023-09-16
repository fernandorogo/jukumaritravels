const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const paqueteturisticoSchema = new Schema({
    nombrepaqueteTuristico: {
        type: String,
        required: true
    },
    reseñapaqueteTuristico: {
        type: String,
        required: true
    },
    valorpaqueteTuristico: {
        type: Number,
        required: true
    },
    detallespaqueteTuristico: [
        {
            nombredetallespaqueteTuristico: String,
            required: true

        },
        {

            precioDetallespaqueteTuristico: Number,
        }
    ],

    destinos: [{ type: Schema.Types.ObjectId, ref: "destinos" }], // Cambiado de "destinos" a "destino"

},
    {
        timestamps: true,
    }
);

paqueteturisticoSchema.plugin(mongoosePaginate);

module.exports = model('paquetesturisticos', paqueteturisticoSchema);
