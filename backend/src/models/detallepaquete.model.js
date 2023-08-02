const { Schema, model } = require('mongoose');

const detallePaqueteSchema = new Schema({
    detallePaquete: {
        type: String,
        required: true,
    },
    
    productosturisticos: [{ type:Schema.Types.ObjectId, ref: "productosturisticos"}]
    
},
    {
        timestamps: true,
    }
);

module.exports = model('detallepaquete', detallePaqueteSchema)