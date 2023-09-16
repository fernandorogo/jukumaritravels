const paisesCtrl = {}
const paisesModel = require('../models/pais.model');



//Listar todos los Paises
paisesCtrl.listall = async (req, res) => {
    try {
        const paises = await paisesModel.find();

        res.json({
            ok: true,
            paises
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        });
    }
};

//Listar Paises con sus respectivos Estados/Departamentos
paisesCtrl.list = async (req, res) => {
    try {
        const paisesConEstados = await paisesModel.aggregate([
            {
                $lookup: {
                    from: 'estados', // Nombre de la colección de estados
                    localField: 'idPais',
                    foreignField: 'idPais',
                    as: 'estados'
                }
            }
        ]);

        res.json({
            ok: true,
            paises: paisesConEstados
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        });
    }
};

//Listar por Id Un Pais con sus Respectivos Estados/Departamentos
paisesCtrl.listid = async (req, res) => {
    try {
        const { idPais } = req.params;

        const paisConEstados = await paisesModel.aggregate([
            {
                $match: { idPais: parseInt(idPais) } // Convertir idPais a número
            },
            {
                $lookup: {
                    from: 'estados',
                    localField: 'idPais',
                    foreignField: 'idPais',
                    as: 'estados'
                }
            }
        ]);

        if (paisConEstados.length === 0) {
            res.status(404).json({
                ok: false,
                message: 'País no encontrado'
            });
            return;
        }

        const pais = paisConEstados[0];
        const estados = pais.estados;

        res.json({
            ok: true,
            pais,
            estados
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        });
    }
};

//Agregar de un Pais a la vez
paisesCtrl.add = async (req, res) => {
    try {
        const { idPais, sigla, nombrePais, codigoTelefonico} = req.body
        
        const verificar = await paisesModel.findOne({ nombrePais });
        if (verificar) {
            return res.json({
                ok: false,
                message: "El Pais ya se encuentra Registrado"
            })
        }
        const newPais = new paisesModel ({
            idPais,
            sigla,
            nombrePais,
            codigoTelefonico
        });
        await newPais.save();
        res.json({
            ok: true,
            newPais
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}

//Agregar un listado de Paises de forma masiva
paisesCtrl.addMany = async (req, res) => {
    try {
        const paisArray = req.body;

        const newPaises = paisArray.map(pais => ({
            idPais: pais.idPais,
            sigla: pais.sigla,
            nombrePais: pais.nombrePais,
            codigoTelefonico: pais.codigoTelefonico
        }));

        // Guardar los nuevos países
        if (newPaises.length > 0) {
            await paisesModel.insertMany(newPaises);
        }

        res.json({
            ok: true,
            message: "Registros de países procesados exitosamente",
            newPaises: newPaises.map(pais => pais.nombrePais)
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        });
    }
};

//Actualziar un Pais a la vez segun su Id
{/* paisesCtrl.update = async (req, res) => {
    try {
        const {id} = req.params;
        const pais = await paisesModel.findById({ _id: id});
        if (!pais) {
            res.status(404).json({
                ok: false,
                message: 'Pais no encontrado'

            })
        }

        const idPais = req.params.idPais || pais.idPais;
        const sigla = req.body.sigla || pais.sigla
        const nombrePais = req.body.nombrePais || pais.nombrePais
        const codigoTelefonico = req.body.codigoTelefonico || pais.codigoTelefonico

        const paisUpdate = {
            idPais,
            sigla,
            nombrePais,
            codigoTelefonico,
        }

        await pais.updateOne(paisUpdate)
        res.json({
            ok: true,
            message: 'El Pais fue actualizado'
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
};
*/}

// Eliminar un Pais a la vez segun su Id
{/* paisesCtrl.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const pais = await paisesModel.findById({ _id: id })
        if (!pais) {
            res.status(404).json({
                ok: false,
                message: 'Pais no encontrado'

            })
        }

        await pais.deleteOne();
        res.json({
            ok: true,
            message: 'Pais eliminado'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
};
*/}



module.exports = paisesCtrl;