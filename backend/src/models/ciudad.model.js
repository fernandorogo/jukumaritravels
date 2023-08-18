const { Schema, model } = require('mongoose');

const ciudadSchema = new Schema({
  idCiudad:{
    type:Number,
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
  // referencia hibrida
  estadoObjectId: {
    type: Schema.Types.ObjectId,
    ref: 'Estado' // Referencia al modelo de Estado
  }

});

module.exports = model('ciudades', ciudadSchema);
