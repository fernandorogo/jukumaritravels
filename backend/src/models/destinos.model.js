const { Schema, model } = require('mongoose');

const destinoSchema = new Schema({
    Destino: {
        type: String,
        required: true

    },
    ubicacion: {
        type: String,
    },
    descripcionDestino: {
        type: String
    },
    categoriadestinos: [{ type: Schema.Types.ObjectId, ref: "categoriadestinos" }]
},
    {
        timestamps: true,
    }
);

module.exports = model('destinos', destinoSchema) 