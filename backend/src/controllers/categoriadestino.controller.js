const categoriadestinoCtrl = {}
const categoriadestinoModel = require('../models/categoriadestino.model')

categoriadestinoCtrl.list = async (req, res) => {
    try {
        const categoriadestino = await categoriadestinoModel.find()
        res.json({
            ok: true,
            categoriadestino

        })
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}
categoriadestinoCtrl.listid = async (req, res) => {
    try {
        const { id } = req.params
        const categoria = await categoriadestinoModel.findById({ _id: id })
        if (!categoria) {
            res.status(404).json({
                ok: false,
                message: 'categoria no encontrada'

            })
        }
        res.json({ ok: true, message: categoria });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }

}
categoriadestinoCtrl.add = async (req, res) => {
    try {
        const { categoriaDestino } = req.body
        const newcategoria = new categoriadestinoModel({

            categoriaDestino
        });
        await newcategoria.save();
        res.json({
            ok: true,
            newcategoria

        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}
categoriadestinoCtrl.update = async (req, res) => {
    try {
        const { id } = req.params;
        const categoria = await categoriadestinoModel.findById({ _id: id })
        if (!categoria) {
            res.status(404).json({
                ok: false,
                message: 'Categoria no encontrada'

            })
        }
        const categoriaDestino = req.body.categoriaDestino || categoria.categoriaDestino


        const categoriaUpdate = {

            categoriaDestino,

        }
        await categoria.updateOne(categoriaUpdate)
        res.json({
            ok: true,
            message: 'La categoria fue actualizado'
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}
categoriadestinoCtrl.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const categoria = await categoriadestinoModel.findById({ _id: id })
        if (!categoria) {
            res.status(404).json({
                ok: false,
                message: 'Categoria no encontrada'

            })
        }

        await categoria.deleteOne();
        res.json({
            ok: true,
            message: 'Categoria eliminada'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}


module.exports = categoriadestinoCtrl;