const clientesCtrl = {}
const clientesModel = require('../models/clientes.model')

clientesCtrl.list = async (req, res) => {
    try {
        const clientes = await clientesModel.find()
        res.json({
            ok: true,
            clientes

        })
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}

clientesCtrl.listid = async (req, res) => {
    try {
        const { id } = req.params
        const cliente = await clientesModel.findById({ _id: id })
        if (!cliente) {
            res.status(404).json({
                ok: false,
                message: 'Cliente no encontrado'

            })
        }
        res.json({ ok: true, message: cliente });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }

}
clientesCtrl.add = async (req, res) => {
    try {
        const { nombre1Cliente, nombre2Cliente, apellido1Cliente, apellido2Cliente, tipodocumentoCliente, documentoCliente, correoelectronicoCliente, telefono1Cliente, telefono2Cliente, fechanacimientoCliente, tipodocumentoTitular, documentoTitular, parentezcoTitular, direccionCliente, pais, departamento, municipio } = req.body

        const verificar = await clientesModel.findOne({ correoelectronicoCliente });
        if (verificar) {
            return res.status(400).json({
                ok: false,
                message: "El correo ya esta registrado con otro cliente"
            })
        }

        const newCliente = new clientesModel({
            nombre1Cliente,
            nombre2Cliente,
            apellido1Cliente,
            apellido2Cliente,
            tipodocumentoCliente,
            documentoCliente,
            correoelectronicoCliente,
            telefono1Cliente,
            telefono2Cliente,
            fechanacimientoCliente,
            tipodocumentoTitular,
            documentoTitular,
            parentezcoTitular,
            direccionCliente,
            pais,
            departamento,
            municipio,


        });
        await newCliente.save();
        res.json({
            ok: true,
            newCliente
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}

clientesCtrl.update = async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await clientesModel.findById({ _id: id })
        if (!cliente) {
            res.status(404).json({
                ok: false,
                message: 'Cliente no encontrado'

            })
        }

        const nombre1Cliente = req.body.nombre1Cliente || cliente.nombre1Cliente
        const nombre2Cliente = req.body.nombre2Cliente || cliente.nombre2Cliente
        const apellido1Cliente = req.body.apellido1Cliente || cliente.apellido1Cliente
        const apellido2Cliente = req.body.apellido2Cliente || cliente.apellido2Cliente
        const tipodocumentoCliente = req.body.tipodocumentoCliente || cliente.tipodocumentoCliente
        const documentoCliente = req.body.documentoCliente || cliente.documentoCliente
        const correoelectronicoCliente = req.body.correoelectronicoCliente || cliente.correoelectronicoCliente
        const telefono1Cliente = req.body.telefono1Cliente || cliente.telefono1Cliente
        const telefono2Cliente = req.body.telefono2Cliente || cliente.telefono2Cliente
        const fechanacimientoCliente = req.body.fechanaciminetoCliente || cliente.fechanacimientoCliente
        const tipodocumentoTitular = req.body.tipodocumentoTitular || cliente.tipodocumentoTitular
        const documentoTitular = req.body.documentoTitular || cliente.documentoTitular
        const parentezcoTitular = req.body.parentezcoTitular || cliente.parentezcoTitular
        const direccionCliente = req.body.direccionCliente || cliente.direccionCliente
        const pais = req.body.paisoTitular || cliente.paisTitular
        const departamento = req.body.departamento || cliente.departamento
        const municipio = req.body.municipio || cliente.municipio



        const clienteUpdate = {
            nombre1Cliente,
            nombre2Cliente,
            apellido1Cliente,
            apellido2Cliente,
            tipodocumentoCliente,
            documentoCliente,
            correoelectronicoCliente,
            telefono1Cliente,
            telefono2Cliente,
            fechanacimientoCliente,
            tipodocumentoTitular,
            documentoTitular,
            parentezcoTitular,
            direccionCliente,
            pais,
            departamento,
            municipio,


        }

        await cliente.updateOne(clienteUpdate)

        res.json({
            ok: true,
            message: 'el cliente fue actualizado'
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}
clientesCtrl.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await clientesModel.findById({ _id: id })
        if (!cliente) {
            res.status(404).json({
                ok: false,
                message: 'Cliente no encontrado'

            })
        }

        await cliente.deleteOne();
        res.json({
            ok: true,
            message: 'Cliente eliminado'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}
module.exports = clientesCtrl;