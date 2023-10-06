const { Router } = require('express')
const route = Router()
const reservasCtrl = require('../controllers/reservas.controller');

route.get('/', reservasCtrl.list);
route.get('/listall', reservasCtrl.listall);
route.get('/listbydata', reservasCtrl.listallByFechaSalida);
route.get('/:id', reservasCtrl.listid);
route.post('/add', reservasCtrl.add);
route.put('/:id', reservasCtrl.update);
route.delete('/:id', reservasCtrl.delete);


module.exports = route 