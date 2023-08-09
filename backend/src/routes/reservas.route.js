const { Router } = require('express')
const route = Router()
const reservasCtrl = require('../controllers/reservas.controller');

route.get('/list', reservasCtrl.list);
route.get('/list/:id', reservasCtrl.listid);
route.post('/add', reservasCtrl.add);
route.put('/update/:id', reservasCtrl.update);
route.delete('/delete/:id', reservasCtrl.delete);


module.exports = route 