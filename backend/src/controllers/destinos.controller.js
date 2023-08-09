const destinosCtrl = {}
const destinosModel = require('../models/destinos.model')

destinosCtrl.list = async (req, res) => {
    try {
        const destinos = await destinosModel.find()
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
        const { Destino, categoriaDestino_id, ubicacion, descripcionDestino } = req.body
        const newDestino = new destinosModel({
            Destino,
            categoriaDestino_id,
            ubicacion,
            descripcionDestino
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
        const categoriaDestino_id = req.body.categoriaDestino_id || destino.categoriaDestino_id
        const ubicacion = req.body.ubicacion || destino.ubicacion
        const descripcionDestino = req.body.descripcionDestino || destino.descripcionDestino

        const destinoUpdate = {
            Destino,
            categoriaDestino_id,
            ubicacion,
            descripcionDestino

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
                message: 'destino no encontrado'

            })
        }

        await destino.deleteOne();
        res.json({
            ok: true,
            message: 'destino eliminado'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}


module.exports = destinosCtrl;