const { Router } = require('express')
const route = Router()
const proveedoresCtrl = require('../controllers/proveedores.controller')

route.get('/list', proveedoresCtrl.list);
route.get('/list/:id', proveedoresCtrl.listid);
route.post('/add', proveedoresCtrl.add);
route.put('/update/:id', proveedoresCtrl.update);
route.delete('/delete/:id', proveedoresCtrl.delete);
module.exports = route