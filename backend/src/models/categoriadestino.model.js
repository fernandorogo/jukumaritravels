const { Schema, model } = require('mongoose');

const categoriadestinoSchema = new Schema({
    categoriaDestino: {
        type: String,
    }

},
    {
        timestamps: true,
    }
);

module.exports = model('categoriadestinos', categoriadestinoSchema)