const productosturisticosCtrl = {}
const productosturisticosModel = require('../models/productosturisticos.model')

productosturisticosCtrl.list = async (req, res) => {
    try {
        const productosturisticos = await productosturisticosModel.find().populate("destinos");
        res.json({
            ok: true,
            productosturisticos

        })
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}
productosturisticosCtrl.listid = async (req, res) => {
    try {
        const { id } = req.params
        const productoturistico = await productosturisticosModel.findById({ _id: id })
        if (!productoturistico) {
            res.status(404).json({
                ok: false,
                message: 'Producto turistico no encontrado'

            })
        }
        res.json({ ok: true, message: productoturistico });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }

}
productosturisticosCtrl.add = async (req, res) => {
    try {
        const { productosTuristicos, detalleProductosturisticos, destinos } = req.body
        const newproductoturistico = new productosturisticosModel({
            productosTuristicos,
            detalleProductosturisticos,
            destinos

        });
        await newproductoturistico.save();
        res.json({
            ok: true,
            newproductoturistico

        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}
productosturisticosCtrl.update = async (req, res) => {
    try {
        const { id } = req.params;
        const productoturistico = await productosturisticosModel.findById({ _id: id })
        if (!productoturistico) {
            res.status(404).json({
                ok: false,
                message: 'Productoturistico no encontrado'

            })
        }
        const productosTuristicos = req.body.productosTuristicos || productoturistico.productosTuristicos
        const detalleProductosturisticos = req.body.detalleProductosTuristicos || productoturistico.detalleProductosturisticos
        const destinos = req.body.destinos || productoturistico.destinos


        const productoturisticoUpdate = {
            productosTuristicos,
            detalleProductosturisticos,
            destinos

        }
        await productoturistico.updateOne(productoturisticoUpdate)
        res.json({
            ok: true,
            message: 'El producto turistico fue actualizado'
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}
productosturisticosCtrl.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const productoturistico = await productosturisticosModel.findById({ _id: id })
        if (!productoturistico) {
            res.status(404).json({
                ok: false,
                message: 'Producto turistico no encontrado'

            })
        }

        await productoturistico.deleteOne();
        res.json({
            ok: true,
            message: 'Producto turistico eliminado'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}


module.exports = productosturisticosCtrl;

