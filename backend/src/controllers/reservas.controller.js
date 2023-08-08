const reservasCtrl = {}
const reservasModel = require('../models/reservas.model')

reservasCtrl.list = async (req, res) => {
    try {
        const reservas = await reservasModel.find().populate("clientes", { nombre1Cliente: 1 }).populate("paquetesturisticos");
        res.json({
            ok: true,
            reservas

        })
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}
reservasCtrl.listid = async (req, res) => {
    try {
        const { id } = req.params
        const reserva = await reservasModel.findById({ _id: id })
        if (!reserva) {
            res.status(404).json({
                ok: false,
                message: 'Reserva no encontrada'

            })
        }
        res.json({ ok: true, message: reserva });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }

}
reservasCtrl.add = async (req, res) => {
    try {
        const { fechaReserva, paqueteTuristico_id, fechaSalida, fechaLlegada, pasajeros, clientes, paquetesturisticos } = req.body
        const newReserva = new reservasModel({
            fechaReserva,
            paqueteTuristico_id,
            fechaSalida,
            fechaLlegada,
            pasajeros,
            clientes,
            paquetesturisticos
        });
        await newReserva.save();
        res.json({
            ok: true,
            newReserva

        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}
reservasCtrl.update = async (req, res) => {
    try {
        const { id } = req.params;
        const reserva = await reservasModel.findById({ _id: id })
        if (!reserva) {
            res.status(404).json({
                ok: false,
                message: 'Reserva no encontrada'

            })
        }
        const fechaReserva = req.body.fechaReserva || reserva.fechaReserva
        const paqueteTuristico_id = req.body.paqueteTuristico_id || reserva.paqueteTuristico_id
        const fechaSalida = req.body.fechaSalida || reserva.fechaSalida
        const fechaLlegada = req.body.fechaLlegada || reserva.fechaLlegada
        const pasajeros = req.body.pasajeros || reserva.pasajeros
        const clientes = req.body.clientes || reserva.clientes
        const paquetesturisticos = req.body.paquetesturisticos || reserva.paquetesturisticos

        const reservaUpdate = {
            fechaReserva,
            paqueteTuristico_id,
            fechaSalida,
            fechaLlegada,
            pasajeros,
            clientes,
            paquetesturisticos
        }
        await reserva.updateOne(reservaUpdate)
        res.json({
            ok: true,
            message: 'La reserva fue actualizada'
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}
reservasCtrl.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const reserva = await reservasModel.findById({ _id: id })
        if (!reserva) {
            res.status(404).json({
                ok: false,
                message: 'Reserva no encontrada'

            })
        }

        await reserva.deleteOne();
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
module.exports = reservasCtrl;

