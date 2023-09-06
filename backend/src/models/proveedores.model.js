const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const proveedorSchema = new Schema({
    tipodocumentoProveedor: {
        type: String,
        required: true
    },
    documentoProveedor: {
        type: Number,
        required: true
    },
    razonsocialProveedor: {
        type: String,
        requied: true
    },
    nombre1Proveedor: {
        type: String,
        required: true
    },
    nombre2Proveedor: {
        type: String
    },
    apellido1Proveedor: {
        type: String,
        required: true
    },
    apellido2Proveedor: {
        type: String,
        required: true
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
    pais: {
        type: String,
      
    },
    departamento: {
        type: String
    },
    municipio: {
        type: String
    },
    direccion: {
        type: String,
       
    }


},
    {
        timestamps: true,
    }
);
proveedorSchema.plugin(mongoosePaginate);

module.exports = model('proveedores', proveedorSchema)

