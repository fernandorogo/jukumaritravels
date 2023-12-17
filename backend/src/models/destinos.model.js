const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2') 

const destinoSchema = new Schema({
    nombreDestino: {
        type: String,
        required: true,
        maxlength: 30

    },
    ubicacionDestino: {
        type: String,
        required: true
    },
    descripcionDestino: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    nameImg: {
        type: String
    }
    
},
    {
        timestamps: true,
    },



);

destinoSchema.methods.setimgUrl= function setimgUrl(filename){
    const url="http://localhost:4000/"
    this.img= url + 'public/' + filename;
    this.nameImg = filename;
}


destinoSchema.plugin(mongoosePaginate);

module.exports = model('destinos', destinoSchema) 