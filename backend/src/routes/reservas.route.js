const { Router } = require('express')
const route = Router()
const reservasCtrl = require('../controllers/reservas.controller');

route.get('/', reservasCtrl.list);
route.get('/:id', reservasCtrl.listid);
route.post('/', reservasCtrl.add);
route.put('/:id', reservasCtrl.update);
route.delete('/:id', reservasCtrl.delete);


module.exports = route 