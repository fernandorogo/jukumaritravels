const clientesCtrl = {}
const clientesModel = require('../models/clientes.model')
const today = new Date();
const currentMonth = today.getMonth() + 1; // El mes actual (se suma 1 ya que los meses en JavaScript son 0-indexados)

clientesCtrl.list = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 5;
        const page = parseInt(req.query.page) || 1;
        const options = {
            limit,
            page,
        };
        //const clientes = await clientesModel.find()
        const clientes = await clientesModel.paginate({}, options)
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

clientesCtrl.listall = async (req, res) => {
    try {
        const clientes = await clientesModel.find({})
        const totalClientes = clientes.length; // Obten el número de registros
        res.json({
            ok: true,
            totalClientes, // Agrega el número de registros a la respuesta
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

clientesCtrl.listByCurrentMonth = async (req, res) => {
    try {
        const clientes = await clientesModel.aggregate([
            {
                $addFields: {
                    monthOfBirth: { $month: '$fechanacimientoCliente' }
                }
            },
            {
                $match: {
                    monthOfBirth: currentMonth
                }
            },
            {
                $project: {
                    _id: 1,
                    fechanacimientoCliente: 1,
                    nombre1Cliente: 1,
                    apellido1Cliente: 1
                }
            }
        ]);

        const totalClientes = clientes.length;

        res.json({
            ok: true,
            totalClientes,
            clientes
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        });
    }
};

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
        const nombreCompleto = `${cliente.nombre1Cliente} ${cliente.nombre2Cliente} ${cliente.apellido1Cliente} ${cliente.apellido2Cliente}`;
        console.log(cliente);
        res.json({ ok: true, message: cliente, nombreCompleto });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }

}

clientesCtrl.listByDocumento = async (req, res) => {
    try {
        const { documentoCliente } = req.params; // Supongo que el documentoCliente es un parámetro en la ruta
        const cliente = await clientesModel.findOne({ documentoCliente });

        if (!cliente) {
            return res.status(404).json({
                ok: false,
                message: 'Cliente no encontrado'
            });
        }

        const nombreCompleto = `${cliente.nombre1Cliente} ${cliente.nombre2Cliente} ${cliente.apellido1Cliente} ${cliente.apellido2Cliente}`;
        console.log(cliente);

        return res.json({ ok: true, message: cliente, nombreCompleto });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: error.message
        });
    }
};


clientesCtrl.add = async (req, res) => {
    try {
        const {
            nombre1Cliente,
            nombre2Cliente,
            apellido1Cliente,
            apellido2Cliente,
            tipodocumentoCliente,
            documentoCliente,
            fechanacimientoCliente,
            correoelectronicoCliente,
            telefono1Cliente,
            telefono2Cliente,
            direccionCliente,
            paisCliente,
            estadoCliente,
            ciudadCliente,
            parentezcoCliente,
            otroParentezco,
            documentoTitular } = req.body

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
            fechanacimientoCliente,
            correoelectronicoCliente,
            telefono1Cliente,
            telefono2Cliente,
            direccionCliente,
            paisCliente,
            estadoCliente,
            ciudadCliente,
            parentezcoCliente,
            otroParentezco,
            documentoTitular


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
        const fechanacimientoCliente = req.body.fechanacimientoCliente || cliente.fechanacimientoCliente
        const correoelectronicoCliente = req.body.correoelectronicoCliente || cliente.correoelectronicoCliente

        const telefono1Cliente = req.body.telefono1Cliente || cliente.telefono1Cliente
        const telefono2Cliente = req.body.telefono2Cliente || cliente.telefono2Cliente
        const direccionCliente = req.body.direccionCliente || cliente.direccionCliente

        const parentezcoCliente = req.body.parentezcoCliente || cliente.parentezcoCliente
        const otroParentezco = req.body.otroParentezco || cliente.otroParentezco
        const documentoTitular = req.body.documentoTitular || cliente.documentoTitular

        const paisCliente = req.body.paisCliente || cliente.paisCliente
        const estadoCliente = req.body.estadoCliente || cliente.estadoCliente
        const ciudadCliente = req.body.ciudadCliente || cliente.ciudadCliente

        const clienteUpdate = {
            nombre1Cliente,
            nombre2Cliente,
            apellido1Cliente,
            apellido2Cliente,
            tipodocumentoCliente,
            documentoCliente,
            fechanacimientoCliente,
            correoelectronicoCliente,
            telefono1Cliente,
            telefono2Cliente,
            direccionCliente,
            paisCliente,
            estadoCliente,
            ciudadCliente,
            parentezcoCliente,
            otroParentezco,
            documentoTitular
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

clientesCtrl.verificarDocumento = async (req, res) => {
    try {
        const documento = req.params.documento;

        // Buscar un cliente por su número de documento en la base de datos
        const clienteEncontrado = await clientesModel.findOne({ documentoCliente: documento });

        // Enviar respuesta al frontend si el cliente fue encontrado o no
        if (clienteEncontrado) {

            // Capturar el _id y el documento del cliente
            const clienteId = clienteEncontrado._id;
            const documentoCliente = clienteEncontrado.documentoCliente;

            const nombreCompleto = `${clienteEncontrado.nombre1Cliente} ${clienteEncontrado.nombre2Cliente} ${clienteEncontrado.apellido1Cliente} ${clienteEncontrado.apellido2Cliente}`;
            res.json({ exists: true, nombreCompleto, clienteId, documentoCliente }); // Cliente encontrado
        } else {
            res.json({ exists: false }); // Cliente no encontrado
        }
    } catch (error) {
        console.error('Error al verificar el documento:', error);
        res.status(500).json({ error: 'Error al verificar el documento' });
    }
};



module.exports = clientesCtrl;