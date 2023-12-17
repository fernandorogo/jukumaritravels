const deleteImgCtrl={}
const path = require('path')
const fs= require('fs')
const {promisify} = require('util')

//Funcion que nos sirve para eliminar una imagen del backend generado por cualquier controlador


deleteImgCtrl.deleteImg = async (nameImage)=>{
    promisify(fs.unlink)(path.resolve(__dirname,"../storage/imgs", nameImage))
};

module.exports = deleteImgCtrl