const { Schema, model } = require('mongoose');

const clienteSchema = new Schema({
    nombre1Cliente: {
        type: String,
        required: true
    },
    nombre2Cliente: {
        type: String
    },
    apellido1Cliente: {
        type: String,
        required: true
    },
    apellido2Cliente: {
        type: String,
        required: true
    },
    tipodocumentoCliente: {
        type: String,
        required: true
    },
    documentoCliente: {
        type: Number,
        required: true
    },
    correoelectronicoCliente: {
        type: String,
        required: true,
        unique: true

    },
    telefono1Cliente: {
        type: Number,
        required: true,

    },
    telefono2Cliente: {
        type: Number,

    },
    fechanacimientoCliente: {
        type: Date,
        required: true
    },
    paisCliente: {
        type: String,
    },
    departamentoCliente: {
        type: String,
    },
    municipioCliente: {
        type: String,
    },
    tipodocumentoTitular: {
        type: String,

    },
    documentoTitular: {
        type: String,

    },
    parentezcoTitular: {
        type: String,

    },
    direccionCliente: {
        type: String,
        required: true
    },
    


},
    {
        timestamps: true,
    }
);

module.exports = model('clientes', clienteSchema)

