const pasajerosdelareservaCtrl = {}
const pasajerosdelareservaModel = require('../models/pasajerosdelareserva.model')

pasajerosdelareservaCtrl.list = async (req, res) => {
    try {
        const pasajerosdelareserva = await pasajerosdelareservaModel.find().populate("clientes", {nombre1Cliente:1} ).populate("reservas") 
        res.json({
            ok: true,
            pasajerosdelareserva

        })
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}
pasajerosdelareservaCtrl.listid = async (req, res) => {
    try {
        const { id } = req.params
        const pasajerosdelareserva = await pasajerosdelareservaModel.findById({ _id: id })
        if (!pasajerosdelareserva) {
            res.status(404).json({
                ok: false,
                message: 'pasajeros de reserva no encontrada'

            })
        }
        res.json({ ok: true, message: pasajerosdelareserva });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }

}
pasajerosdelareservaCtrl.add = async (req, res) => {
    try {
        const { reservas, clientes } = req.body
        const newpasajerosdelareserva = new pasajerosdelareservaModel({
            reservas,
            clientes,

        });
        await newpasajerosdelareserva.save();
        res.json({
            ok: true,
            newpasajerosdelareserva

        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}
pasajerosdelareservaCtrl.update = async (req, res) => {
    try {
        const { id } = req.params;
        const pasajerosdelareserva = await pasajerosdelareservaModel.findById({ _id: id })
        if (!pasajerosdelareserva) {
            res.status(404).json({
                ok: false,
                message: 'Reserva no encontrada'

            })
        }
        const reservas = req.body.reservas || pasajerosdelareserva.reservas
        const clientes = req.body.clientes || pasajerosdelareserva.clientes

        const pasajerosdelareservaUpdate = {
            reservas,
            clientes,

        }
        await pasajerosdelareserva.updateOne(pasajerosdelareservaUpdate)
        res.json({
            ok: true,
            message: 'Pasajero de la reserva actualizado'
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}
pasajerosdelareservaCtrl.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const pasajerosdelareserva = await pasajerosdelareservaModel.findById({ _id: id })
        if (!pasajerosdelareserva) {
            res.status(404).json({
                ok: false,
                message: 'Reserva no encontrada'

            })
        }

        await pasajerosdelareserva.deleteOne();
        res.json({
            ok: true,
            message: 'Reserva eliminada'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}
module.exports = pasajerosdelareservaCtrl;

