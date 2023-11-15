const { Schema, model } = require('mongoose');

const reservaSchema = new Schema({
    fechaReserva: {
        type: String, // Cambiado a Date para trabajar con fechas
        required: true,
        validator: function (value) {
          return value >= new Date()
        },
    },

    fechaLlegada: {
        type: Date,
        validate: {
          validator: function (value) {
            return this.fechaSalida && (value > this.fechaReserva) && (value < this.fechaSalida)
          },
          message: 'La fecha de ingreso debe ser anterior o igual a la fecha de salida.'
        }
    },
   
    fechaSalida: {
        type: Date,
        validate: {
          validator: function (value) {
            return this.fechaIngreso && (value > this.fechaReserva) && (value > this.fechaLlegada)
          },
          message: 'La fecha de salida debe ser posterior o igual a la fecha de ingreso.'
        }
    },

    npasajeros: {
        type: Number
    },

    clientes: [{type: Schema.Types.ObjectId, ref: 'clientes' }],
    destinos: [{ type: Schema.Types.ObjectId, ref: 'destinos' }],
    paquetesturisticos: [{ type: Schema.Types.ObjectId, ref: "paquetesturisticos" }]
},
    {
        timestamps: true,
    }
);

module.exports = model('reservas', reservaSchema)