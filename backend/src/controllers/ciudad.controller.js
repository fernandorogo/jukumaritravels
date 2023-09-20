const ciudadCtrl = {};
const ciudadModel = require('../models/ciudad.model');
const estadoModel = require('../models/estado.model'); // Asegúrate de que el nombre del modelo sea correcto
const mongoose = require('mongoose');


ciudadCtrl.list = async (req, res) => {
    try {
        

        const idEstado = req.query.estado;
        const ciudades = await ciudadModel.find({ estado: idEstado });


        res.json({
            ok: true,
            ciudades
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        });
    }
};

ciudadCtrl.listid = async (req, res) => {
    try {
        const { id } = req.params;
        const ciudad = await ciudadModel.findById(id).populate('idEstado');
        if (!ciudad) {
            res.status(404).json({
                ok: false,
                message: 'Ciudad no encontrada'
            });
            return;
        }
        res.json({
            ok: true,
            ciudad
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        });
    }
};

ciudadCtrl.add = async (req, res) => {
    try {
        const { idCiudad, nombreCiudad, idEstado } = req.body;

        const newCiudad = new ciudadModel({
            idCiudad,
            nombreCiudad,
            idEstado
        });

        await newCiudad.save();

        res.json({
            ok: true,
            newCiudad
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        });
    }
};

ciudadCtrl.addMany = async (req, res) => {
    try {
        const ciudadArray = req.body;

        const newCiudades = [];
        const existingCiudadMessages = [];

        for (const ciudad of ciudadArray) {
            const { idCiudad, nombreCiudad, idEstado } = ciudad;

            // Buscar el estado por su idEstado y obtener su ObjectId
            const estado = await estadoModel.findOne({ idEstado });
            if (!estado) {
                existingCiudadMessages.push(`El estado con ID '${idEstado}' no se encontró.`);
            } else {
                const ciudadToAdd = {
                    idCiudad,
                    nombreCiudad,
                    idEstado,
                    estadoObjectId: estado._id
                };
                newCiudades.push(ciudadToAdd);
            }
        }

        if (newCiudades.length > 0) {
            await ciudadModel.insertMany(newCiudades);
        }

        const response = {
            newCiudades: newCiudades.map(ciudad => ciudad.nombreCiudad),
            existingCiudadMessages,
        };

        res.status(201).json({
            ok: true,
            message: 'Registros de Ciudades procesados exitosamente',
            response
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error en el servidor.'
        });
    }
};

ciudadCtrl.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { idCiudad, nombreCiudad, idEstado } = req.body;

        const ciudad = await ciudadModel.findById(id);
        if (!ciudad) {
            res.status(404).json({
                ok: false,
                message: 'Ciudad no encontrada'
            });
            return;
        }

        ciudad.idCiudad = idCiudad || ciudad.idCiudad;
        ciudad.nombreCiudad = nombreCiudad || ciudad.nombreCiudad;
        ciudad.idEstado = idEstado || ciudad.idEstado;

        await ciudad.save();

        res.json({
            ok: true,
            message: 'La Ciudad fue actualizada'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        });
    }
};

ciudadCtrl.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const ciudad = await ciudadModel.findById(id);
        if (!ciudad) {
            res.status(404).json({
                ok: false,
                message: 'Ciudad no encontrada'
            });
            return;
        }

        await ciudad.deleteOne();

        res.json({
            ok: true,
            message: 'Ciudad eliminada'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        });
    }
};

module.exports = ciudadCtrl;