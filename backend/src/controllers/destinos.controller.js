const destinosCtrl = {}
const destinosModel = require('../models/destinos.model')

destinosCtrl.list = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 5;
        const page = parseInt(req.query.page) || 1;
        const options = {
            limit,
            page,
        };

        //const destinos = await destinosModel.find().populate("categoriadestinos");}
        const destinos = await destinosModel.paginate({}, options)
        res.json({
            ok: true,
            destinos

        })
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}
destinosCtrl.listid = async (req, res) => {
    try {
        const { id } = req.params
        const destino = await destinosModel.findById({ _id: id })
        if (!destino) {
            res.status(404).json({
                ok: false,
                message: 'Destino no encontrado'

            })
        }
        res.json({ ok: true, message: destino });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }

}
destinosCtrl.add = async (req, res) => {
    try {
        const { nombreDestino, ubicacion, descripcionDestino, categoriadestinos } = req.body

        const verificar = await destinosModel.findOne({ nombreDestino });
        if (verificar) {
            return res.status(400).json({
                ok: false,
                message: "El nombre del destino ya se encuentra registrado"
            })
        }




        const newDestino = new destinosModel({
            nombreDestino,
            ubicacion,
            descripcionDestino,
            categoriadestinos
        });
        await newDestino.save();
        res.json({
            ok: true,
            newDestino

        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}
destinosCtrl.update = async (req, res) => {
    try {
        const { id } = req.params;
        const destino = await destinosModel.findById({ _id: id })
        if (!destino) {
            res.status(404).json({
                ok: false,
                message: 'Destino no encontrado'

            })
        }
        const Destino = req.body.Destino || destino.Destino
        const ubicacion = req.body.ubicacion || destino.ubicacion
        const descripcionDestino = req.body.descripcionDestino || destino.descripcionDestino
        const categoriadestinos = req.body.categoriadestinos || destino.categoriadestinos

        const destinoUpdate = {
            Destino,
            ubicacion,
            descripcionDestino,
            categoriadestinos

        }
        await destino.updateOne(destinoUpdate)
        res.json({
            ok: true,
            message: 'El destino fue actualizado'
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}
destinosCtrl.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const destino = await destinosModel.findById({ _id: id })
        if (!destino) {
            res.status(404).json({
                ok: false,
                message: 'Destino no encontrado'

            })
        }

        await destino.deleteOne();
        res.json({
            ok: true,
            message: 'Destino eliminado'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}


module.exports = destinosCtrl;