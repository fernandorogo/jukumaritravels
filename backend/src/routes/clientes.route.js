const { Router } = require('express')
const route = Router()
const clientesCtrl = require('../controllers/clientes.controller')

route.get('/', clientesCtrl.list);
route.get('/:id', clientesCtrl.listid);
route.get('/verificar/:documento', clientesCtrl.verificarDocumento);
route.post('/', clientesCtrl.add);
route.put('/:id', clientesCtrl.update);
route.delete('/:id', clientesCtrl.delete);


module.exports = route 