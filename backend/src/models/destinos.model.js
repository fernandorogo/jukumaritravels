const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2') 

const destinoSchema = new Schema({
    nombreDestino: {
        type: String,
        required: true,
        maxlength: 20

    },
    ubicacion: {
        type: String,
        required: true
    },
    descripcionDestino: {
        type: String,
        required: true
    },
    // categoriadestinos: [{ type: Schema.Types.ObjectId, ref: "categoriadestinos" }]
},
    {
        timestamps: true,
    }
);

destinoSchema.plugin(mongoosePaginate);

module.exports = model('destinos', destinoSchema)