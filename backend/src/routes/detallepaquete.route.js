const { Router } = require('express')
const route = Router()
const detallepaqueteCtrl = require('../controllers/detallepaquete.controller')

route.get('/list', detallepaqueteCtrl.list);
route.get('/list/:id', detallepaqueteCtrl.listid);
route.post('/add', detallepaqueteCtrl.add);
route.put('/update/:id', detallepaqueteCtrl.update);
route.delete('/delete/:id', detallepaqueteCtrl.delete);


module.exports = route 