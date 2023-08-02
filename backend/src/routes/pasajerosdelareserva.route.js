const { Router } = require('express')
const route = Router()
const pasajerosdelareservaCtrl = require('../controllers/pasajerosdelareserva.controller');

route.get('/list', pasajerosdelareservaCtrl.list);
route.get('/list/:id', pasajerosdelareservaCtrl.listid);
route.post('/add', pasajerosdelareservaCtrl.add);
route.put('/update/:id', pasajerosdelareservaCtrl.update);
route.delete('/delete/:id', pasajerosdelareservaCtrl.delete);


module.exports = route 