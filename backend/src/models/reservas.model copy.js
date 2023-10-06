const { Schema, model } = require('mongoose');

const reservaSchema = new Schema({
    fechaReserva: {
        type: String, // Cambiado a Date para trabajar con fechas
        required: true
        
    },
   
    fechaSalida: {
        type: Date,
        required: true,
        validate: [
            {
                validator: function (value) {
                    return value > this.fechaReserva;
                },
                message: 'La fecha no puede ser menor a la fecha de Reserva.'
            },
            {
                validator: function (value) {
                    return value.toDateString() !== this.fechaReserva.toDateString();
                },
                message: 'La fecha no puede ser igual a la fecha de Reserva.'
            },
        ]
    },
    fechaLlegada: {
        type: Date,
        required: true,
        validate: [
            {
                validator: function (value) {
                    return value >= this.fechaReserva;
                },
                message: 'La fecha no puede ser menor a la fecha de Reserva.'
            },
            {
                validator: function (value) {
                    return value !== this.fechaSalida;
                },
                message: 'La fecha no puede ser igual a la fecha de Salida.'
            },
            {
                validator: function (value) {
                    return value !== this.fechaReserva;
                },
                message: 'La fecha no puede ser igual a la fecha de Reserva.'
            },
        ]
    },
    documentoTitular: {
        type: Number,

    },


    pasajeros: {
        type: String,
        
    },
    clientes: [{ type: Schema.Types.ObjectId, ref: "clientes" }],
    destinos: [{ type: Schema.Types.ObjectId, ref: 'destinos' }],
    paquetesturisticos: [{ type: Schema.Types.ObjectId, ref: "paquetesturisticos" }]
},
    {
        timestamps: true,
    }
);

module.exports = model('reservas', reservaSchema)