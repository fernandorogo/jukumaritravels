const estadoCtrl = {};
const estadoModel = require('../models/estado.model');
const paisModel = require('../models/pais.model');
const mongoose = require('mongoose'); 

//Listar todos los Estados
estadoCtrl.listAll = async (req, res) => {
    try {
        const idPais = req.query.pais;
        const estados = await estadoModel.find({ pais: idPais });


        res.json({
            ok: true,
            estados
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        });
    }
};

//Listar Estados con sus respectivas ciudades
estadoCtrl.list = async (req, res) => {
    try {
        const estadosConCiudades = await estadoModel.aggregate([
            {
                $lookup: {
                    from: 'ciudades', // Nombre de la colección de ciudades
                    localField: 'idEstado',
                    foreignField: 'idEstado',
                    as: 'ciudades'
                }
            }
        ]);

        res.json({
            ok: true,
            paises: estadosConCiudades
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        });
    }
};

//Listar por Id Un Estado con sus Respectivas Ciudades
estadoCtrl.listid = async (req, res) => {
    try {
        const { idEstado } = req.params;

        const estadoConCiudades = await estadoModel.aggregate([
            {
                $match: { idEstado: parseInt(idEstado) } // Convertir idEstado a número
            },
            {
                $lookup: {
                    from: 'ciudades',
                    localField: 'idEstado',
                    foreignField: 'idEstado',
                    as: 'ciudades'
                }
            }
        ]);

        if (estadoConCiudades.length === 0) {
            res.status(404).json({
                ok: false,
                message: 'Estado/Departamento no encontrado'
            });
            return;
        }

        res.json({
            ok: true,
            estado: estadoConCiudades[0]
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        });
    }
};

//Agregar de un Estado a la vez
estadoCtrl.add = async (req, res) => {
    try {
        const { idEstado, nombreEstado, idPais } = req.body;

        const verificar = await estadoModel.findOne({ nombreEstado });
        if (verificar) {
            return res.json({
                ok: false,
                message: 'El Estado/Departamento ya se encuentra registrado'
            });
        }

        // Buscar el ObjectId correspondiente al idPais
        const pais = await paisModel.findOne({ idPais });
        if (!pais) {
            return res.json({
                ok: false,
                message: 'El país asociado no se encontró.'
            });
        }

        // Crear un nuevo estado con el ObjectId del país
        const newEstado = new estadoModel({
            idEstado,
            nombreEstado,
            idPais,
            paisObjectId: pais._id
        });

        await newEstado.save();

        res.json({
            ok: true,
            newEstado
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        });
    }
};

//Agregar un listado de Estados de forma masiva
estadoCtrl.addMany = async (req, res) => {
    try {
        const estadoArray = req.body;

        const existingEstadoIds = await estadoModel.distinct('idEstado');

        const newEstados = [];
        const existingEstadoMessages = [];

        for (const estado of estadoArray) {
            if (existingEstadoIds.includes(estado.idEstado)) {
                existingEstadoMessages.push(`El estado con ID '${estado.idEstado}' ya está registrado.`);
            } else {
                // Buscar el país por su idPais y obtener su ObjectId
                const pais = await paisModel.findOne({ idPais: estado.idPais });
                if (!pais) {
                    existingEstadoMessages.push(`El país con ID '${estado.idPais}' no se encontró.`);
                } else {
                    const estadoToAdd = {
                        idEstado: estado.idEstado,
                        nombreEstado: estado.nombreEstado,
                        idPais: pais.idPais, // Usar el idPais
                        paisObjectId: pais._id
                    };
                    newEstados.push(estadoToAdd);
                }
            }
        }

        if (newEstados.length > 0) {
            await estadoModel.insertMany(newEstados);
        }

        const response = {
            newEstados: newEstados.map(estado => estado.idEstado),
            existingEstadoMessages,
        };

        res.status(201).json({
            ok: true,
            message: 'Registros de Estados/Departamentos procesados exitosamente',
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


//Actualziar un Estado a la vez segun su Id
{/* estadoCtrl.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { idEstado, nombreEstado, idPais } = req.body;

        const estado = await estadoModel.findById(id);
        if (!estado) {
            res.status(404).json({
                ok: false,
                message: 'Estado/Departamento no encontrado'
            });
            return;
        }

        // Buscar el ObjectId correspondiente al idPais
        const pais = await paisModel.findOne({ idPais });
        if (!pais) {
            res.json({
                ok: false,
                message: 'El país asociado no se encontró.'
            });
            return;
        }

        estado.idEstado = idEstado || estado.idEstado;
        estado.nombreEstado = nombreEstado || estado.nombreEstado;
        estado.idPais = idPais || estado.idPais;
        estado.paisObjectId = pais._id; // Actualizar el ObjectId del país

        await estado.save();

        res.json({
            ok: true,
            message: 'El Estado/Departamento fue actualizado'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        });
    }
};
*/}

// Eliminar un Estado a la vez segun su Id
{/* estadoCtrl.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const estado = await estadoModel.findById(id);
        if (!estado) {
            res.status(404).json({
                ok: false,
                message: 'Estado/Departamento no encontrado'
            });
            return;
        }

        await estado.deleteOne();

        res.json({
            ok: true,
            message: 'Estado/Departamento eliminado'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        });
    }
};
*/}

module.exports = estadoCtrl;