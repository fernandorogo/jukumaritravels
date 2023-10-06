const { Router } = require('express')
const route = Router()
const paquetesturisticosCtrl = require('../controllers/paquetesturisticos.controller')

route.get('/list', paquetesturisticosCtrl.list);
route.get('/list/:id', paquetesturisticosCtrl.listid);
route.get('/listidDestino/:id', paquetesturisticosCtrl.listidDestino)
route.post('/add', paquetesturisticosCtrl.add);
route.put('/:id', paquetesturisticosCtrl.update);
route.delete('/:id', paquetesturisticosCtrl.delete);




module.exports = route 