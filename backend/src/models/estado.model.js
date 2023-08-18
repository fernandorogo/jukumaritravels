const { Schema, model } = require('mongoose');

const estadosSchema = new Schema({
  idEstado: {
    type: Number,
    required: true
  },
  nombreEstado: {
    type: String,
    required: true
  },
  idPais: {
    type: Number,
    required: true
  },
  // referencia hibrida
  paisObjectId: {
    type: Schema.Types.ObjectId,
    ref: 'Paises' // Referencia al modelo de Paises
  },
  ciudades: [{
    type: Schema.Types.ObjectId,
    ref: 'Ciudades'
}]


}, {
  timestamps: true,
});

module.exports = model('Estados', estadosSchema);