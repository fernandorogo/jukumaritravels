const paquetesturisticosCtrl = {}
const paquetesturisticosModel = require('../models/paquetesturisticos.model')

paquetesturisticosCtrl.list = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 2;
        const page = parseInt(req.query.page) || 1;
        const options = {
            limit,
            page
        }
        const paquetesturisticos = await paquetesturisticos.Model.paginate({}, options)
        res.json({
            ok: true,
            paquetesturisticos

        })
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}
paquetesturisticosCtrl.listid = async (req, res) => {
    try {
        const { id } = req.params
        const paqueteturistico = await paquetesturisticosModel.findById({ _id: id })
        if (!paqueteturistico) {
            res.status(404).json({
                ok: false,
                message: 'Paquete turistico no encontrado'

            })
        }
        res.json({ ok: true, message: paqueteturistico });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }

}
paquetesturisticosCtrl.add = async (req, res) => {
    try {
        const { paqueteTuristico, reseñaPaqueteturistico, valordelPaquete, destinos, detallepaquete } = req.body
        const newpaqueteturistico = new paquetesturisticosModel({
            paqueteTuristico,
            reseñaPaqueteturistico,
            valordelPaquete,
            destinos,
            detallepaquete

        });
        await newpaqueteturistico.save();
        res.json({
            ok: true,
            newpaqueteturistico

        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
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
        const paqueteTuristico = req.body.paqueteTuristico || paqueteturistico.paqueteTuristico
        const reseñaPaqueteturistico = req.body.reseñaPaqueteturistico || paqueteturistico.reseñaPaqueteturistico
        const valordelPaquete = req.body.valordelPaquete || paqueteturistico.valordelPaquete
        const destinos = req.body.destinos || paqueteturistico.destinos
        const detallepaquete = req.body.detallepaquete || paqueteturistico.detallepaquete

        const paqueteturisticoUpdate = {
            paqueteTuristico,
            reseñaPaqueteturistico,
            valordelPaquete,
            destinos,
            detallepaquete


        }
        await paqueteturistico.updateOne(paqueteturisticoUpdate)
        res.json({
            ok: true,
            message: 'El paquete turistico fue actualizado'
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

