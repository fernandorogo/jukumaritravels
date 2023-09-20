const { Router } = require('express')
const route = Router()
const proveedoresCtrl = require('../controllers/proveedores.controller')

route.get('/list', proveedoresCtrl.list);
route.get('/:id', proveedoresCtrl.listid);
route.post('/', proveedoresCtrl.add);
route.put('/:id', proveedoresCtrl.update);
route.delete('/:id', proveedoresCtrl.delete);
module.exports = route