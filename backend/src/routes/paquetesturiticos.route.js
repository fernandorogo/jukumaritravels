const { Router } = require('express')
const route = Router()
const paquetesturisticosCtrl = require('../controllers/paquetesturisticos.controller')

route.get('/list', paquetesturisticosCtrl.list);
route.get('/:id', paquetesturisticosCtrl.listid);
route.post('/', paquetesturisticosCtrl.add);
route.put('/:id', paquetesturisticosCtrl.update);
route.delete('/:id', paquetesturisticosCtrl.delete);


module.exports = route 