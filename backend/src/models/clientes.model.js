const { Schema, model } = require('mongoose');

const clienteSchema = new Schema({
    nombre1Cliente: {
        type: String,
        required: true,
        maxlength: 20
    },
    nombre2Cliente: {
        type: String,
        maxlength: 20
    },
    apellido1Cliente: {
        type: String,
        required: true,
        maxlength: 20
    },
    apellido2Cliente: {
        type: String,
        maxlength: 20
    },
    tipodocumentoCliente: {
        type: String,
        required: true
    },
    documentoCliente: {
        type: Number,
        maxlength: 20,
        required: true
        
    },
    fechanacimientoCliente: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value <= new Date(); // La fecha no puede ser futura.
            },
            message: 'La fecha no puede ser futura.'
        }
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
    direccionCliente: {
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
    parentezcoCliente: {
        type: String,
    },
    otroParentezco: {
        type: String,

    },
    documentoTitular: {
        type: Number,

    },

},
    {
        timestamps: true,
    }
);

// Validación personalizada para limitar la longitud del nombre1Cliente
clienteSchema.pre('save', function (next) {
    if (this.nombre1Cliente.length > 20) {
        return next(new Error('El nombre1Cliente excede el límite de longitud.'));
    }
    if (this.nombre2Cliente && this.nombre2Cliente.length > 20) {
        return next(new Error('El nombre2Cliente excede el límite de longitud.'));
    }
    if (this.apellido1Cliente.length > 20) {
        return next(new Error('El apellido1Cliente excede el límite de longitud.'));
    }
    if (this.apellido2Cliente.length > 20) {
        return next(new Error('El apellido2Cliente excede el límite de longitud.'));
    }
    // ...otras validaciones si es necesario
    next();
});

module.exports = model('clientes', clienteSchema)

