const proveedoresCtrl = {}
const proveedoresModel = require('../models/proveedores.model')

proveedoresCtrl.list = async (req, res) => {
    try {
        const proveedores = await proveedoresModel.find()
        res.json({
            ok: true,
            proveedores

        })
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}
proveedoresCtrl.listid = async (req, res) => {
    try {
        const { id } = req.params
        const proveedor = await proveedoresModel.findById({ _id: id })
        if (!proveedor) {
            res.status(404).json({
                ok: false,
                message: 'Proveedor no encontrado'

            })
        }
        res.json({ ok: true, message: proveedor });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }

}
proveedoresCtrl.add = async (req, res) => {
    try {
        const {  documentoProveedor, razonsocialProveedor, tipoProveedor, telefono1Proveedor, telefono2Proveedor, whatsappProveedor, correoelectronicoProveedor,  paisCliente,
            estadoCliente,ciudadCliente, direccion } = req.body

        const verificar = await proveedoresModel.findOne({ documentoProveedor });
        if (verificar) {
            return res.json({
                ok: false,
                message: "El documento ya esta registrado con otro proveedor"
            })
        }

        const newProveedor = new proveedoresModel({
            
            documentoProveedor,
            razonsocialProveedor,
            tipoProveedor,
            telefono1Proveedor,
            telefono2Proveedor,
            whatsappProveedor,
            correoelectronicoProveedor,
            paisCliente,
            estadoCliente,
            ciudadCliente,
            direccion


        });
        await newProveedor.save();
        res.json({
            ok: true,
            newProveedor
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}
proveedoresCtrl.update = async (req, res) => {
    try {
        const { id } = req.params;
        const proveedor = await proveedoresModel.findById({ _id: id })
        if (!proveedor) {
            res.status(404).json({
                ok: false,
                message: 'Proveedor no encontrado'

            })
        }

    
        const documentoProveedor = req.body.documentoProveedor || proveedor.documentoProveedor
        const razonsocialProveedor = req.body.razonsocialProveedor || proveedor.razonsocialProveedor
        const tipoProveedor = req.body.tipoProveedor || proveedor.tipoProveedor
        const telefono1Proveedor = req.body.telefono1Proveedor || proveedor.telefono1Proveedor
        const telefono2Proveedor = req.body.telefono2Proveedor || proveedor.telefono2Proveedor
        const whatsappProveedor = req.body.whatsappProveedor || proveedor.whatsappProveedor
        const correoelectronicoProveedor = req.body.correoelectronicoProveedor || proveedor.correoelectronicoProveedor
        const paisCliente = req.body.paisCliente || proveedor.paisCliente
        const estadoCliente = req.body.estadoCliente || proveedor.estadoCliente
        const ciudadCliente = req.body.ciudadCliente || proveedor.ciudadCliente
        const direccion = req.body.direccion || proveedor.direccion

        const proveedorUpdate = {
            
            documentoProveedor,
            razonsocialProveedor,
            tipoProveedor,
            telefono1Proveedor,
            telefono2Proveedor,
            whatsappProveedor,
            correoelectronicoProveedor,
            paisCliente,
            estadoCliente,
            ciudadCliente,
            direccion


        }

        await proveedor.updateOne(proveedorUpdate)

        res.json({
            ok: true,
            message: 'El proveedor fue actualizado'
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}
proveedoresCtrl.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const proveedor = await proveedoresModel.findById({ _id: id })
        if (!proveedor) {
            res.status(404).json({
                ok: false,
                message: 'Proveedor no encontrado'

            })
        }

        await proveedor.deleteOne();
        res.json({
            ok: true,
            message: 'Proveedor eliminado'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}

module.exports = proveedoresCtrl