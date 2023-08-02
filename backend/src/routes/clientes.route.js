const { Router } = require('express')
const route = Router()
const clientesCtrl = require('../controllers/clientes.controller')

route.get('/list', clientesCtrl.list);
route.get('/list/:id', clientesCtrl.listid);
route.post('/add', clientesCtrl.add);
route.put('/update/:id', clientesCtrl.update);
route.delete('/delete/:id', clientesCtrl.delete);


module.exports = route 