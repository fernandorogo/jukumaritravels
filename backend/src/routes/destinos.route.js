const { Router } = require('express')
const route = Router()
const destinosCtrl = require('../controllers/destinos.controller')

route.get('/', destinosCtrl.list);
route.get('/:id', destinosCtrl.listid);
route.post('/', destinosCtrl.add);
route.put('/:id', destinosCtrl.update);
route.delete('/:id', destinosCtrl.delete);

module.exports = route