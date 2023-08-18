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
    destinos: [{ type:Schema.Types.ObjectId, ref: "destinos"}],

},
    {
        timestamps: true,
    }
);

module.exports = model('productosturisticos', productoturisticoSchema)