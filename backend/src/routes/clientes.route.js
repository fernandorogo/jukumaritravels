const { Router } = require('express')
const route = Router()
const clientesCtrl = require('../controllers/clientes.controller')

route.get('/list', clientesCtrl.list);
route.get('/listall', clientesCtrl.listall);
route.get('/current-month', clientesCtrl.listByCurrentMonth);
route.get('/:id', clientesCtrl.listid);
route.get('/verificar/:documento', clientesCtrl.verificarDocumento);
route.post('/', clientesCtrl.add);
route.put('/:id', clientesCtrl.update);
route.delete('/:id', clientesCtrl.delete);


module.exports = route 