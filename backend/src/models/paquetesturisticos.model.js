const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const paqueteturisticoSchema = new Schema({
    nombrePaqueteTuristico: {
        type: String,
        required: true,
    },
    reseñaPaqueteTuristico: {
        type: String,
        required: true,
    },
    valorPaqueteTuristico: {
        type: Number,
        required: true,
    },
    detallesPaqueteTuristico: [
        {
            nombredetallesPaqueteTuristico: {
                type: String,
            },
            precioDetallesPaqueteTuristico: {
                type: Number,
            }
              
        },
    ],

    destinos: [{ type: Schema.Types.ObjectId, ref: "destinos" }], // Cambiado de "destinos" a "destino"

},
    {
        timestamps: true,
    }
);

paqueteturisticoSchema.plugin(mongoosePaginate);

module.exports = model('paquetesturisticos', paqueteturisticoSchema);
