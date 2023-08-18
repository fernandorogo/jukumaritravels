const detallepaqueteCtrl = {}
const detallepaqueteModel = require('../models/detallepaquete.model')

detallepaqueteCtrl.list = async (req, res) => {
    try {
        const detallepaquete = await detallepaqueteModel.find().populate("productosturisticos")
        res.json({
            ok: true,
            detallepaquete

        })
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}
detallepaqueteCtrl.listid = async (req, res) => {
    try {
        const { id } = req.params
        const detallepaquete = await detallepaqueteModel.findById({ _id: id })
        if (!detallepaquete) {
            res.status(404).json({
                ok: false,
                message: 'Detalle de paquete no encontrado'

            })
        }
        res.json({ ok: true, message: detallepaquete });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }

}
detallepaqueteCtrl.add = async (req, res) => {
    try {
        const { detallePaquete, productosturisticos } = req.body
        const newdetallepaquete = new detallepaqueteModel({
            detallePaquete,
            productosturisticos


        });
        await newdetallepaquete.save();
        res.json({
            ok: true,
            newdetallepaquete

        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}
detallepaqueteCtrl.update = async (req, res) => {
    try {
        const { id } = req.params;
        const detallepaquete = await detallepaqueteModel.findById({ _id: id })
        if (!detallepaquete) {
            res.status(404).json({
                ok: false,
                message: 'Detalle de paquete no encontrado'

            })
        }
        const detallePaquete = req.body.detallePaquete || detallepaquete.detallePaquete
        const productosturisticos = req.body.productosturisticos || detallepaquete.productosturisticos

        const detallepaqueteUpdate = {
            detallePaquete,
            productosturisticos



        }
        await detallepaquete.updateOne(detallepaqueteUpdate)
        res.json({
            ok: true,
            message: 'El detalle de paquete fue actualizado'
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}
detallepaqueteCtrl.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const detallepaquete = await detallepaqueteModel.findById({ _id: id })
        if (!detallepaquete) {
            res.status(404).json({
                ok: false,
                message: 'Detalle de paquete no encontrado'

            })
        }

        await detallepaquete.deleteOne();
        res.json({
            ok: true,
            message: 'Detalle de paquete eliminado'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}


module.exports = detallepaqueteCtrl;