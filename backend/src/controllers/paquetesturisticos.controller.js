const paquetesturisticosCtrl = {}
const paquetesturisticosModel = require('../models/paquetesturisticos.model')

paquetesturisticosCtrl.list = async (req, res) => {
    try {
        const paquetesturisticos = await paquetesturisticosModel.find().populate("destinos")
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
                message: 'paquete turistico no encontrada'

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
        const { paqueteTuristico, reseñaPaqueteturistico, destino_id, valordelPaquete, destinos} = req.body
        const newpaqueteturistico = new paquetesturisticosModel({
            paqueteTuristico,
            reseñaPaqueteturistico,
            destino_id,
            valordelPaquete,
            destinos
           
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
                message: 'paqueteturistico no encontrada'

            })
        }
        const paqueteTuristico = req.body.paqueteTuristico || paqueteturistico.paqueteTuristico
        const reseñaPaqueteturistico = req.body.reseñaPaqueteturistico || paqueteturistico.reseñaPaqueteturistico
        const destino_id = req.body.destino_id || paqueteturistico.destino_id
        const valordelPaquete = req.body.valordelPaquete || paqueteturistico.valordelPaquete
        const destinos = req.body.destinos || paqueteturistico.destinos

        const paqueteturisticoUpdate = {
            paqueteTuristico,
            reseñaPaqueteturistico,
            destino_id,
            valordelPaquete,
            destinos
            

        }
        await paqueteturistico.updateOne(paqueteturisticoUpdate)
        res.json({
            ok: true,
            message: 'El paqueteturistico fue actualizado'
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
                message: 'paqueteturistico no encontrado'

            })
        }

        await paqueteturistico.deleteOne();
        res.json({
            ok: true,
            message: 'paqueteturistico eliminado'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}


module.exports = paquetesturisticosCtrl;


