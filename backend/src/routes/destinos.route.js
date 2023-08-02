const { Router } = require('express')
const route = Router()
const destinosCtrl = require('../controllers/destinos.controller')

route.get('/list', destinosCtrl.list);
route.get('/list/:id', destinosCtrl.listid);
route.post('/add', destinosCtrl.add);
route.put('/update/:id', destinosCtrl.update);
route.delete('/delete/:id', destinosCtrl.delete);

module.exports = route