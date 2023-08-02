const mongoose = require('mongoose');

const URI = 'mongodb://127.0.0.1:27017/jukumari';

const conn = async () => {
    try {
        const db = await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            //useFindAndModify: false,

        });
        console.log("Base de datos conectada", db.connection.name)
    } catch (error) {
        console.log(error.message)
    }
};

module.exports = conn()

