const { Schema, model } = require('mongoose');

const destinoSchema = new Schema({
    Destino: {
        type: String,
        required: true

    },
    categoriaDestino_id: {
        type: Number,
        required: true
    },
    ubicacion: {
        type: String,
    },
    descripcionDestino: {
        type: String
    }
},
    {
        timestamps: true,
    }
);

module.exports = model('destinos', destinoSchema) 