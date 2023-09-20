const { Router } = require('express')
const route = Router()
const ciudadCtrl = require('../controllers/ciudad.controller')

route.get('/list', ciudadCtrl.list);
route.get('/list/:id', ciudadCtrl.listid);
route.post('/add', ciudadCtrl.add);
route.post('/addmany', ciudadCtrl.addMany);
route.put('/update/:id', ciudadCtrl.update);
route.delete('/delete/:id', ciudadCtrl.delete);


module.exports = route