const destinosCtrl = {}
const { deleteImg } = require('../helpers/deleteImg');
const destinosModel = require('../models/destinos.model');

destinosCtrl.list = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 5;
        const page = parseInt(req.query.page) || 1;
        const options = {
            limit,
            page
        }
        const destinos = await destinosModel.paginate({}, options)
        res.json({
            ok: true,
            destinos,

        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        });
    }
};
destinosCtrl.ListAll = async (req, res) => {
    try {
        const destinos = await destinosModel.find();
        const totalDestinos = destinos.length; // Obten el número de destinos
        res.json({
            ok: true,
            totalDestinos, // Agrega el número de destinos a la respuesta
            destinos
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        });

    }
}
destinosCtrl.listById = async (req, res) => {
    try {
        const { id } = req.params
        const destino = await destinosModel.findById({ _id: id })
        destino
            ? res.json({ ok: true, destino })
            : res.status(404).json({ ok: false, mensaje: "Destino no encontrado" })

    } catch (error) {
        res.status(500).json({
            ok: false,
            mensaje: error.message,
        })

    }
}
destinosCtrl.add=async(req,res) => {
    try {
        const { nombreDestino, ubicacionDestino, descripcionDestino } = req.body;
        const newDestino=new destinosModel ({
            nombreDestino,
            ubicacionDestino, 
            descripcionDestino,
        });
        if (req.file){
            const { filename }=req.file;
            newDestino.setimgUrl(filename);
        }
        await newDestino.save()
        res.status(201).json({ ok:true, newDestino,mensaje:'Destino Guardado'})
    } catch  (error) {
        res.status(500).json({
            ok:false,
            mensaje:error.message,
        });
    }
};
destinosCtrl.update=async(req, res) => {
    try {
        const {id}=req.params;
        const destino=await destinosModel.findById({_id:id})
        if(!destino){
            return res.json({ok:false,mensaje:"El Destino no fue encontrado"})
        }
        if(req.file) {
            if(destino.nameImg){
                deleteImg(destino.nameImg)
            }
            const {filename}=req.file;
            destino.setimgUrl(filename);
            await destino.save();
        }
        
        await destino.updateOne(req.body);
        res.json({ ok:true, mensaje: "El Destino se actualizo correctamente"});
    } catch (error) {
        res.status(500).json({
            ok:false,
            mensaje:error.message,
        });
    }
}


destinosCtrl.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const destino = await destinosModel.findById({ _id: id })
        if (!destino) {
            return res.status(404).json({ok: false,message: "El Destino no fue encontrado"})
        }
        if (destino.nameImg) {
            deleteImg(destino.nameImg);

        }
        await destino.deleteOne();
        res.json({
            ok: true,
            message: 'El Destino fue eliminado'
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}


module.exports = destinosCtrl;