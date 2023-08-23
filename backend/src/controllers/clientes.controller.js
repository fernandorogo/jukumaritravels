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
        const nombreCompleto = `${cliente.nombre1Cliente} ${cliente.nombre2Cliente} ${cliente.apellido1Cliente} ${cliente.apellido2Cliente}`;
        res.json({ ok: true, message: cliente, nombreCompleto });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }

}

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
        const nombreCompleto = `${clienteEncontrado.nombre1Cliente} ${clienteEncontrado.nombre2Cliente} ${clienteEncontrado.apellido1Cliente} ${clienteEncontrado.apellido2Cliente}`;
        res.json({ exists: true, nombreCompleto }); // Cliente encontrado
      } else {
        res.json({ exists: false }); // Cliente no encontrado
      }
    } catch (error) {
      console.error('Error al verificar el documento:', error);
      res.status(500).json({ error: 'Error al verificar el documento' });
    }
  };
  
  

module.exports = clientesCtrl;