const { Schema, model } = require('mongoose');

const productoturisticoSchema = new Schema({

    productosTuristicos: {
        type: String,
        required: true,
    },
    detalleProductosturisticos: {
        type: String,
        required: true,
    },
    destino_id: {
        type: Number,
        required: true
    }

},
    {
        timestamps: true,
    }
);

module.exports = model('productosturisticos', productoturisticoSchema)