const reservasCtrl = {}
const reservasModel = require('../models/reservas.model')

reservasCtrl.list = async (req, res) => {
    try {
        const reservas = await reservasModel.find();
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

reservasCtrl.listall = async (req, res) => {
    try {
        const reservas = await reservasModel.find();
        const totalReservas = reservas.length; // Obtén el número de registros listados
        res.json({
            ok: true,
            totalReservas,
            reservas
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        });
    }
};

reservasCtrl.listallByFechaSalida = async (req, res) => {
    try {
      const reservas = await reservasModel
        .find()
        .sort({ fechaSalida: 1 })
        .select('fechaSalida destinos');
  
      res.json({
        ok: true,
        reservas,
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        message: error.message,
      });
    }
  };
  



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
        const { fechaReserva, fechaSalida, fechaLlegada, npasajeros, clientes, destinos, paquetesturisticos } = req.body
        const newReserva = new reservasModel({
            fechaReserva,
            fechaSalida,
            fechaLlegada,
            npasajeros,
            destinos,
            paquetesturisticos,
            clientes
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
        const fechaSalida = req.body.fechaSalida || reserva.fechaSalida
        const fechaLlegada = req.body.fechaLlegada || reserva.fechaLlegada
        const npasajeros = req.body.npasajeros || reserva.npasajeros
        const documentoCliente = req.body.documentoCliente || reserva.documentoCliente
        const destinos = req.body.destinos || reserva.destinos
        const paquetesturisticos = req.body.paquetesturisticos || reserva.paquetesturisticos

        const reservaUpdate = {
            fechaReserva,
            fechaSalida,
            fechaLlegada,
            npasajeros,
            documentoCliente,
            destinos,
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

