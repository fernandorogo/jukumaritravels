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

paquetesturisticosCtrl.listid = async (req, res) => {
    try {
        const { id } = req.params;
        const paqueteturistico = await paquetesturisticosModel.findById(id).populate('detallepaquete');

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

paquetesturisticosCtrl.add = async (req, res) => {
    try {
        const newpaquetetrustico = await paquetesturisticosModel.create(req.body)
        res.status(201).json({
            ok: true,
            newpaquetetrustico
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message,
        });
    }

}

paquetesturisticosCtrl.update = async (req, res) => {
    try {
        const { id } = req.params;
        const paqueteturistico = await paquetesturisticosModel.findById({ _id: id })

        if (!paqueteturistico) {
            res.status(404).json({
                ok: false,
                message: 'Paquete turistico no encontrado'
            })
        }

        const { detallesPaqueteTuristico, deldetallesPaqueteTuristico } = req.body;
        detallesPaqueteTuristico && (await paqueteturistico.updateOne({ $addToSet: { detallesPaqueteTuristico } }));
        deldetallesPaqueteTuristico && (await paqueteturistico.updateOne({ $pullAll: { detallesPaqueteTuristico: deldetallesPaqueteTuristico } }));
        res.json({
            ok: true,
            message: "Paquete turistico actualziado"
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}

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