const { Schema, model } = require('mongoose');

const paisSchema = new Schema({
  idPais: { 
    type: Number,
    required: true,
    unique: true
  },
  sigla: {
    type: String,
    required: true,
    unique: true
  },
  nombrePais: {
    type: String,
    required: true
  },
  codigoTelefonico: {
    type: String,
    required: true
  },
  estados: [{
    type: Schema.Types.ObjectId,
    ref: 'Estados'
}]
}, {
  timestamps: true,
});

module.exports = model('Paises', paisSchema);