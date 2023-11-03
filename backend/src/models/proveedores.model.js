const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const proveedorSchema = new Schema({

    documentoProveedor: {
        type: Number,
        required: true
    },
    razonsocialProveedor: {
        type: String,
        requied: true
    },
    tipoProveedor: {
        type: String,
        required: true
    },
    telefono1Proveedor: {
        type: Number,
        required: true,

    },
    telefono2Proveedor: {
        type: Number,
        required: true,

    },
    whatsappProveedor: {
        type: Number,
        

    },
    correoelectronicoProveedor: {
        type: String,
        required: true

    },
    paisCliente: {
        type: Number,
    },
    estadoCliente: {
        type: Number,
    },
    ciudadCliente: {
        type: Number,
    },
    direccion: {
        type: String,
        required: true

    },

    

},
    {
        timestamps: true,
    }
);
proveedorSchema.plugin(mongoosePaginate);

module.exports = model('proveedores', proveedorSchema)

