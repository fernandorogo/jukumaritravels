const paquetesturisticosCtrl = {}
const paquetesturisticosModel = require('../models/paquetesturisticos.model')


paquetesturisticosCtrl.list = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 5;
        const page = parseInt(req.query.page) || 1;
        const options = {
            limit,
            page,

        };
        const paquetesturisticos = await paquetesturisticosModel.paginate({}, options);

        res.json({
            ok: true,
            paquetesturisticos,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message,
        });
    }
};

paquetesturisticosCtrl.listall = async (req, res) => {
    try {
        const paquetesturisticos = await paquetesturisticosModel.find({});
        res.json({
            ok: true,
            paquetesturisticos,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message,
        });
    }
};

paquetesturisticosCtrl.listid = async (req, res) => {
    try {
        const { id } = req.params;
        const paqueteturistico = await paquetesturisticosModel.findById(id).populate('detallesPaqueteTuristico');

        if (!paqueteturistico) {
            return res.status(404).json({
                ok: false,
                message: 'Paquete turístico no encontrado'
            });
        }
        res.json({ ok: true, paqueteturistico });
    } catch (error) {
        console.error('Error en paquetesturisticosCtrl.listid:', error);
        res.status(500).json({
            ok: false,
            message: error.message
        });
    }
};

paquetesturisticosCtrl.listDestinos = async (req, res) => {
    try {
        const destinos = await paquetesturisticosModel.distinct('destinos');

        res.json({
            ok: true,
            destinos,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: error.message,
        });
    }
};

paquetesturisticosCtrl.listByDestinoOrder = async (req, res) => {
    try {
        // Realiza una consulta para obtener todos los paquetes turísticos y ordenarlos por destino
        const paquetes = await paquetesturisticosModel
            .find({})
            .populate('destinos') // Asegúrate de que el campo coincida con el nombre de la referencia en tu modelo de paquetes turísticos
            .sort('destinos.nombreDestino'); // Ordena por el campo 'nombreDestino' del modelo de destinos

        if (!paquetes || paquetes.length === 0) {
            return res.status(404).json({ message: 'No se encontraron paquetes turísticos.' });
        }
        const response = {
            destino: paquetes[0].destinos, // Tomamos el primer destino ya que todos los paquetes tendrán el mismo destino
            paquetes: paquetes
        };



        res.json(paquetes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

paquetesturisticosCtrl.add = async (req, res) => {
    try {
        // Extrae los campos del cuerpo de la solicitud
        const {
            nombrePaqueteTuristico,
            reseñaPaqueteTuristico,
            valorPaqueteTuristico,
            detallesPaqueteTuristico, // Esto es un arreglo de objetos
            destinos
        } = req.body;

        // Verifica si ya existe un paquete turístico con el mismo nombre
        const verificar = await paquetesturisticosModel.findOne({ nombrePaqueteTuristico });
        if (verificar) {
            return res.status(400).json({
                ok: false,
                message: "Ya existe un paquete turístico con este nombre."
            });
        }

        // Crea un nuevo paquete turístico con los datos proporcionados
        const newPaqueteTuristico = new paquetesturisticosModel({
            nombrePaqueteTuristico,
            reseñaPaqueteTuristico,
            valorPaqueteTuristico,
            detallesPaqueteTuristico, // Puedes pasar el arreglo de objetos directamente
            destinos
        });

        // Guarda el nuevo paquete turístico en la base de datos
        await newPaqueteTuristico.save();

        res.status(201).json({
            ok: true,
            newPaqueteTuristico
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        });
    }
};



paquetesturisticosCtrl.update = async (req, res) => {
    try {
        const { id } = req.params;
        const paqueteturistico = await paquetesturisticosModel.findById({ _id: id });

        if (!paqueteturistico) {
            return res.status(404).json({
                ok: false,
                message: 'Paquete turístico no encontrado'
            });
        }

        const { detallesPaqueteTuristico, deldetallesPaqueteTuristico} = req.body;
        detallesPaqueteTuristico && (await paqueteturistico.updateOne({$addToSet: {detallesPaqueteTuristico}}));

        deldetallesPaqueteTuristico && (await paqueteturistico.updateOne({ $pullAll: {detallesPaqueteTuristico: deldetallesPaqueteTuristico}}))

        await paqueteturistico.updateOne(req.body);

        res.json({
            ok: true,
            message: 'Paquete turístico actualizado'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        });
    }
};


paquetesturisticosCtrl.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const paqueteturistico = await paquetesturisticosModel.findById({ _id: id })
        if (!paqueteturistico) {
            res.status(404).json({
                ok: false,
                message: 'Paquete turistico no encontrado'
            })
        }
        await paqueteturistico.deleteOne();
        res.json({
            ok: true,
            message: 'Paquete turistico eliminado'
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}




module.exports = paquetesturisticosCtrl;