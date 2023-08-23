const { Schema, model } = require('mongoose');

const ciudadSchema = new Schema({
  idCiudad: {
    type: Number,
    required: true
  },
  nombreCiudad: {
    type: String,
    required: true
  },
  idEstado: {
    type: Number,
    required: true
  },
  // referencia híbrida
  estadoObjectId: {
    type: Schema.Types.ObjectId,
    ref: 'Estados' // Referencia al modelo de Estados
  }
});

module.exports = model('ciudades', ciudadSchema);